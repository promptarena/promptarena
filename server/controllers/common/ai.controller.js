// Import required modules.
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // For handling file paths
const { APP_NAME } = require('../../config/envConfig');
const {
  sendSuccessResponse,
  handleError,
} = require('../../utils/responseUtils');
const chatbotModel = require('../../models/chatbot.model');

// Create an instance of the Express app.
const app = express();

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Load the system prompt from a text file (synchronously).
const loadSystemPrompt = (filePathDir = '../../prompts/system_prompt.txt') => {
  const filePath = path.join(__dirname, filePathDir); // Construct the full path to the file
  console.log('filePath: ', filePath);

  // Check if the system_prompt.txt file exists
  if (!fs.existsSync(filePath)) {
    console.error('System prompt file is missing: system_prompt.txt');
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
    console.log('System instructions are loaded from system_prompt.txt');
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

// System prompt loaded from the text file.
const SYSTEM_PROMPT = loadSystemPrompt(
  (filePathDir = '../../prompts/system_prompt.txt')
);
console.log('SYSTEM_PROMPT: ', SYSTEM_PROMPT);

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

// Route to handle Pollinations API call.
app.post('/chat', async (req, res) => {
  const { message, model } = req.body;

  // Validate message - it must be a non-empty string.
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message is required.' });
  }

  // Validate model - it must be one of the valid models.
  if (!model || !validModels.includes(model)) {
    return res.status(400).json({ error: 'Valid model is required.' });
  }

  // Prepare the payload to send to the Pollinations API.
  const data = {
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    model: model, // The model the user selected.
    seed: 42, // You can modify or randomize the seed if needed.
    response_format: 'json_object',
  };

  // Define headers for the API request.
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    'User-Agent': 'axios/1.7.9',
  };

  try {
    // Make the POST request to the Pollinations API.
    const response = await axios.post(apiUrl, data, { headers });
    console.log('response: ', response);

    // Check if the response is successful and return it to the client.
    if (response.status === 200) {
      const assistantResponse = response.data; // Extract the assistant's reply from response.data.

      // Save chat details in the database.
      const chat = new chatbotModel({
        model,
        userMessage: message,
        assistantResponse: assistantResponse, // Adjust based on API response structure.
        seed: 42,
      });

      await chat.save(); // Save to the database.

      return sendSuccessResponse(res, 'API request successful.', {
        success: true,
        model: model,
        seed: data.seed,
        timestamp: Date.now(),
        message: message,
        
        role: 'assistant',
        data: response.data,
      });
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    // Handle errors and return appropriate messages.
    if (error.response) {
      // If the API returns an error response.
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // If no response was received from the API.
      return res.status(500).json({
        success: false,
        message: error.message || 'Error processing request.',

      })
    } else {
      // For other errors (e.g., network issues).
      return res.status(500).json({
        success: false,
        message: error.message || 'Error processing request.',
      });
    }
  }
});

// System prompt loaded from the text file.
const SYSTEM_PROMPT_PERSONAL = loadSystemPrompt(
  (filePathDir = '../../prompts/system_prompt.txt')
);

console.log('SYSTEM_PROMPT_PERSONAL: ', SYSTEM_PROMPT_PERSONAL);

app.post('/personalized/chat', async (req, res) => {
  const {
    message,
    seed = 42,
    model = 'openai',
    temperature = 0.7,
    max_tokens = 10000000000000000000000000000000,
    top_p = 1.0,
    frequency_penalty = 0.0,
    presence_penalty = 0.0,
    stop = ['\n'],
    response_format = 'json_object',
  } = req.body;

  const data = {
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT_PERSONAL,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    model: model, // The model the user selected.
    seed: seed, // You can modify or randomize the seed if needed.
    response_format: response_format,
    temperature: temperature,
    max_tokens: max_tokens,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
    stop: stop,
  };

  // Define headers for the API request.
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    'User-Agent': 'axios/1.7.9',
  };

  try {
    // Make the POST request to the Pollinations API.
    const response = await axios.post(apiUrl, data, { headers });
    console.log('response: ', response);

    // Check if the response is successful and return it to the client.
    if (response.status === 200) {
      return res.json({
        success: true,
        model: model,
        seed: data.seed,
        data: response.data,
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: `Error: Received status code ${response.status}, ${response.data}`,
      });
    }
  } catch (error) {
    // Handle errors and return appropriate messages.
    if (error.response) {
      // If the API returns an error response.
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data || 'Error processing request.',
      });
    } else if (error.request) {
      // If no response was received from the API.
      return res.status(500).json({
        success: false,
        message: `No response received from ${APP_NAME} API.`,
      });
    } else {
      // For other errors (e.g., network issues).
      return res.status(500).json({
        success: false,
        message:
          error.message || 'An error occurred while processing the request.',
      });
    }
  }
});

// Export the app module for use in other files (e.g., server.js).
module.exports = app;

// Optionally, you can add a test route or server setup here if this is the entry point.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
