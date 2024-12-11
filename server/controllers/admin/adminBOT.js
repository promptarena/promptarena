// Import required modules.
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // For handling file paths
const { APP_NAME } = require('../../config/envConfig');
const formatTime = require('../../utils/dateFormatter');

// Create an instance of the Express app.
const app = express();

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Load the system prompt from a text file (synchronously).
const loadSystemPrompt = (
  filePathDir = '../../prompts/CUSTOM_INSTRUCTIONS.txt'
) => {
  const filePath = path.join(__dirname, filePathDir); // Construct the full path to the file
  console.log('filePath: ', filePath);

  // Check if the CUSTOM_INSTRUCTIONS.txt file exists
  if (!fs.existsSync(filePath)) {
    console.error('System prompt file is missing: CUSTOM_INSTRUCTIONS.txt');
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      ${APP_NAME} is a generative AI platform for creating text, images, music, and videos. 
      It supports multiple AI models such as OpenAI, Mistral, Llama, and more. 
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('System instructions are loaded from CUSTOM_INSTRUCTIONS.txt');
    return data;
  } catch (err) {
    console.error('Error reading system prompt file:', err);
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      ${APP_NAME} is a generative AI platform for creating text, images, music, and videos. 
      It supports multiple AI models such as OpenAI, Mistral, Llama, and more. 
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }
};

// Load the system prompt from the text file (no need for duplication)
const CUSTOM_INSTRUCTIONS = loadSystemPrompt(
  '../../prompts/CUSTOM_INSTRUCTIONS.txt'
);
console.log('CUSTOM_INSTRUCTIONS: ', CUSTOM_INSTRUCTIONS);

// Valid AI models
const validModels = [
  'openai',
  'mistral',
  'mistral-large',
  'llama',
  'command-r',
  'unity',
  'midijourney',
  'rtist',
  'searchgpt',
  'evil',
  'qwen-coder',
  'p1',
];

// Define the Pollinations API URL.
const apiUrl = 'https://text.pollinations.ai/';

// Initialize chat history (for testing purposes)
let chatHistory = [];

// The main function that handles the conversation
const sendChat = async (req, res) => {
  try {
    const {
      message,
      seed = 42,
      model = 'openai',
      temperature = 0.7,
      max_tokens = 100000000,
      top_p = 1.0,
      frequency_penalty = 0.0,
      presence_penalty = 0.0,
      stop = ['\n'],
      response_format = 'json_object',
      jsonMode = true, // Added jsonMode
    } = req.body;

    // Validate the input message
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: "Invalid 'message' input. It must be a non-empty string.",
      });
    }

    // Validate the model
    if (!validModels.includes(model)) {
      return res.status(400).json({
        error: `Invalid 'model' input. It must be one of: ${validModels.join(
          ', '
        )}.`,
      });
    }

    // Add system prompt and user message to chat history
    chatHistory.push({ role: 'system', content: CUSTOM_INSTRUCTIONS });
    chatHistory.push({ role: 'user', content: message });

    // Prepare the payload to send to the Pollinations API
    const data = {
      messages: chatHistory, // Send entire chat history to maintain context
      model,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      stop,
      seed,
      response_format,
    };

    console.log(
      'Request Body to Pollinations API: ',
      JSON.stringify(data, null, 2)
    );

    // Define the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Send request to Pollinations API
    const response = await axios.post(apiUrl, data, { headers });

    console.log(
      'Pollinations API response: ',
      JSON.stringify(response.data, null, 2)
    );

    // Add the full response to the chat history for better tracking
    const botResponse = response.data;
    chatHistory.push({
      role: 'assistant',
      content: JSON.stringify(botResponse), // Store full response for future context
    });

    // Format the timestamp for the response
    const timestamp = formatTime();
    console.log('timestamp: ', timestamp);

    // Build the response to return
    const formattedResponse = {
      success: true,
      data: botResponse,
      message: 'BOT RESPONSE RECEIVED',
      model,
      seed,
      role: 'assistant',
      timestamp,
    //   history: chatHistory.map((entry) => entry.content), 
      jsonMode, // Include jsonMode in response
    };

    // Send the full response back to the client
    res.json(formattedResponse);
  } catch (error) {
    console.error('Error handling chat:', error.message);

    // Handle errors with more context
    if (error.response && error.response.data) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Endpoint to clear chat history
app.post('/clearall', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared.' });
});

// Register the endpoints
app.post('/access', sendChat);

// Export the app module for use in other files (e.g., server.js).
module.exports = app;

// Optionally, you can add a test route or server setup here if this is the entry point.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
