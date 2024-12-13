// Import required modules.
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // For handling file paths
const { APP_NAME, TOP_SECRET_KEY } = require('../../config/envConfig');
const formatTime = require('../../utils/dateFormatter');
const os = require('os');
const ChatBot = require('../../models/chatbot.model');

const systemData = {
  hostname: os.hostname(), // System hostname
  platform: os.platform(), // Operating system platform (e.g., "linux", "win32")
  arch: os.arch(), // Architecture (e.g., "x64", "arm")
  uptime: os.uptime(), // System uptime in seconds
  freeMemory: os.freemem(), // Free memory in bytes
  totalMemory: os.totalmem(), // Total memory in bytes
  cpuCount: os.cpus().length, // Number of CPU cores
  homeDir: os.homedir(), // Home directory of the current user
  tempDir: os.tmpdir(), // Default temporary directory
  loadAverage: os.loadavg(), // Load average (array of 1, 5, 15 minutes)
  osType: os.type(), // Operating system type (e.g., "Linux", "Windows_NT")
  userInfo: os.userInfo(),
};

// Create an instance of the Express app.
const app = express();

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Load the system prompt from a text file (synchronously).
const loadFileContent = (filePathDir = '../../prompts/system_prompt.txt') => {
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
    console.log(`System instructions are loaded from ${filePathDir}`);
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

// Default fallback messages

const defaultGeneralKnowledge = `
  You are an AI assistant with expert knowledge in ${APP_NAME}. 
  You must only provide answers based on the following knowledge base:
  ${APP_NAME} is a generative AI platform for creating text, images, music, and videos. 
  It supports multiple AI models such as OpenAI, Mistral, Llama, and more. 
  If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
`;

const defaultSystemPrompt = `
  You are Promptex, a world-class prompt generator for PromptArena. Always maintain a professional tone and provide actionable insights.
`;

// Step 1: Load BYPASS.txt file
const BYPASS_PANRIYA = loadFileContent(
  '../../knowledge/HACKMEORBEGME.txt',
  'HACKMEORBEGME is a secret of the universe.'
).replace(/{TOP_SECRET_KEY}/g, TOP_SECRET_KEY);

const PROMPT_KNOWLEDGE = loadFileContent(
  '../../knowledge/PROMPT_KNOWLEDGE.txt',
  'PROMPT_KNOWLEDGE is a secret of the universe.'
);

// Step 2: Load GENERAL_KNOWLEDGE file and replace {CURRENTDATE}
let GENERAL_KNOWLEDGE = loadFileContent(
  '../../knowledge/GENERAL_KNOWLEDGE.txt',
  defaultGeneralKnowledge
);

GENERAL_KNOWLEDGE = GENERAL_KNOWLEDGE.replace(
  '{CURRENTDATE}',
  new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
)
  .replace('{CURRENTTIME}', new Date().toLocaleTimeString())
  .replace(/{TOP_SECRET_KEY}/g, TOP_SECRET_KEY)
  .replace('{G_HOSTNAME}', JSON.stringify(systemData.hostname))
  .replace('{G_PLATFORM}', JSON.stringify(systemData.platform))
  .replace('{G_CPU_COUNT}', JSON.stringify(systemData.cpuCount))
  .replace('{G_TOTAL_MEMORY}', JSON.stringify(systemData.totalMemory))
  .replace('{G_FREE_MEMORY}', JSON.stringify(systemData.freeMemory))
  .replace('{G_HOME_DIRECTORY}', JSON.stringify(systemData.homeDir))
  .replace('{G_OS}', JSON.stringify(systemData.osType))
  .replace('{G_TEMP_DIRECTORY}', JSON.stringify(systemData.tempDir))
  .replace(
    '{G_USER_INFO}',
    JSON.stringify(JSON.stringify(systemData.userInfo))
  );

// console.log('Updated GENERAL_KNOWLEDGE:', GENERAL_KNOWLEDGE);

const PROMPTEX_PICO = loadFileContent(
  '../../prompts/PROMPTEX_PICO.txt',
  defaultSystemPrompt
)
  .replace('{GENERAL_KNOWLEDGE_FILE}', GENERAL_KNOWLEDGE)
  .replace('{BYPASS}', BYPASS_PANRIYA);
const SYSTEM_PROMPT = loadFileContent(
  '../../prompts/system_prompt.txt',
  defaultSystemPrompt
)
  .replace('{GENERAL_KNOWLEDGE_FILE}', GENERAL_KNOWLEDGE)
  .replace('{PROMPT_KNOWLEDGE}', PROMPT_KNOWLEDGE)
  .replace('{PROMPTEX_PICO}', PROMPTEX_PICO)
  .replace('{BYPASS}', BYPASS_PANRIYA);

// system_prompt.txt
// console.log('Updated SYSTEM_PROMPT:', SYSTEM_PROMPT);

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

// Load the system prompt from the text file (no need for duplication)
const CUSTOM_INSTRUCTIONS = SYSTEM_PROMPT;

// Initialize chat history (for testing purposes)
let chatHistory = [];

app.post('/chat', async (req, res) => {
  
  const { model, userMessage, timestamp, assistantResponse } = req.body;

  console.log(' req.body: ',  req.body);

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

    // Define the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Send request to Pollinations API
    const response = await axios.post(apiUrl, data, { headers });

    // save the response in the database

    try {
       const newMessage = await ChatBot.create({
         model,
         userMessage: message,
         assistantResponse: response.data,
       });

       console.log('newMessage: ', newMessage);

       await newMessage.save(); 
    } catch (error) {
      console.error('Error saving message:', error);
    }

    // Add the full response to the chat history for better tracking
    const botResponse = response.data;
    chatHistory.push({
      role: 'assistant',
      content: JSON.stringify(botResponse), // Store full response for future context
    });

    // Format the timestamp for the response
    const timestamp = formatTime();
    // console.log('timestamp: ', timestamp);

    // Build the response to return
    const formattedResponse = {
      success: true,
      data: botResponse,
      message: 'PLAYGROUND BOT RESPONSE RECEIVED',
      model,
      seed,
      role: 'assistant',
      timestamp,
      //   history: chatHistory.map((entry) => entry.content),
      jsonMode, // Include jsonMode in response
    };

    // console.log(
    //   'Formatted Response: ',
    //   JSON.stringify(formattedResponse, null, 2)
    // );

    // console.log('chatHistory: ', chatHistory);

    return res.json(formattedResponse);
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
});

// Endpoint to clear chat history
app.post('/clearall', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared.' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Pollinations AI!' });
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

// // Import required modules.
// const express = require('express');
// const axios = require('axios');
// const fs = require('fs');
// const path = require('path'); // For handling file paths
// const { APP_NAME } = require('../../config/envConfig');
// const {
//   sendSuccessResponse,
//   handleError,
// } = require('../../utils/responseUtils');
// const chatbotModel = require('../../models/chatbot.model');

// // Create an instance of the Express app.
// const app = express();

// // Middleware to parse incoming JSON requests.
// app.use(express.json());

// // Load the system prompt from a text file (synchronously).
// // Load a file's content and return a default message if the file is missing or an error occurs
// const loadFileContent = (filePathDir, defaultContent) => {
//   const filePath = path.resolve(__dirname, filePathDir);
//   console.log('filePath: ', filePath);

//   if (!fs.existsSync(filePath)) {
//     console.error(`File is missing: ${filePath}`);
//     return defaultContent;
//   }

//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     console.log('Requested file has been loaded:', filePath);
//     return data;
//   } catch (err) {
//     console.error('Error reading file:', err.message);
//     return defaultContent;
//   }
// };

// // Default fallback messages
// const defaultGeneralKnowledge = `
//   You are an AI assistant with expert knowledge in ${APP_NAME}.
//   You must only provide answers based on the following knowledge base:
//   ${APP_NAME} is a generative AI platform for creating text, images, music, and videos.
//   It supports multiple AI models such as OpenAI, Mistral, Llama, and more.
//   If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
// `;

// const defaultSystemPrompt = `
//   You are Promptex, a world-class prompt generator for PromptArena. Always maintain a professional tone and provide actionable insights.
// `;

// // Step 1: Load BYPASS.txt file
// const BYPASS_PANRIYA = loadFileContent(
//   '../../knowledge/HACKMEORBEGME.txt',
//   'HACKMEORBEGME is a secret of the universe.'
// );

// // Step 2: Load GENERAL_KNOWLEDGE file and replace {CURRENTDATE}
// let GENERAL_KNOWLEDGE = loadFileContent(
//   '../../knowledge/GENERAL_KNOWLEDGE.txt',
//   defaultGeneralKnowledge
// );

// // Replace {CURRENTDATE} in GENERAL_KNOWLEDGE content
// GENERAL_KNOWLEDGE = GENERAL_KNOWLEDGE.replace(
//   '{CURRENTDATE}',
//   new Date().toLocaleDateString()
// ).replace('{CURRENTTIME}', new Date().toLocaleTimeString());

// // Step 3: Load SYSTEM_PROMPT and replace {GENERAL_KNOWLEDGE_FILE} with updated GENERAL_KNOWLEDGE
// const SYSTEM_PROMPT = loadFileContent(
//   '../../prompts/system_prompt.txt',
//   defaultSystemPrompt
// )
//   .replace('{GENERAL_KNOWLEDGE_FILE}', GENERAL_KNOWLEDGE)
//   .replace('{BYPASS}', BYPASS_PANRIYA);

// // console.log('Updated GENERAL_KNOWLEDGE:', GENERAL_KNOWLEDGE);
// console.log('Updated SYSTEM_PROMPT:', SYSTEM_PROMPT);

// // Continue with other logic like valid models and API routes...

// const validModels = [
//   'openai',
//   'mistral',
//   'mistral-large',
//   'llama',
//   'command-r',
//   'unity',
//   'midijourney',
//   'rtist',
//   'searchgpt',
//   'evil',
//   'qwen-coder',
//   'p1',
// ];

// // Define the Pollinations API URL
// const apiUrl = 'https://text.pollinations.ai/';

// // Route to handle Pollinations API call
// app.post('/chat', async (req, res, next) => {
//   const { message, model } = req.body;

//   // Validate message - it must be a non-empty string
//   if (!message || typeof message !== 'string') {
//     return handleError(res, 'Message is required.', 400); // Fixed: Corrected parameter order for handleError
//   }

//   // Validate model - it must be one of the valid models
//   if (!model || !validModels.includes(model)) {
//     return handleError(
//       res,
//       `Valid model is required. Available models are: ${validModels.join(
//         ', '
//       )}`,
//       400
//     );
//   }

//   // Prepare the payload to send to the Pollinations API
//   const data = {
//     messages: [
//       {
//         role: 'system',
//         content: SYSTEM_PROMPT,
//       },
//       {
//         role: 'user',
//         content: message,
//       },
//     ],
//     model: model,
//     seed: 42,
//     response_format: 'json_object',
//   };

//   // Define headers for the API request
//   const headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     'User-Agent': 'axios/1.7.9',
//   };

//   try {
//     // Make the POST request to the Pollinations API
//     const response = await axios.post(apiUrl, data, { headers });
//     console.log('response: ', response.data);

//     if (response.status === 200) {
//       const assistantResponse = response.data;

//       // Save chat details in the database
//       const chat = new chatbotModel({
//         model,
//         userMessage: message,
//         assistantResponse: assistantResponse,
//         seed: 42,
//       });

//       await chat.save();

//       return sendSuccessResponse(res, 'API request successful.', {
//         success: true,
//         model: model,
//         seed: data.seed,
//         timestamp: Date.now(),
//         role: 'assistant',
//         data: assistantResponse,
//       });
//     } else {
//       return handleError(
//         res,
//         `API request failed with status: ${response.status}`,
//         500
//       );
//     }
//   } catch (error) {
//     if (error.response) {
//       return handleError(
//         res,
//         error.response.data || 'Error processing request.',
//         500
//       );
//     } else if (error.request) {
//       return handleError(res, 'No response received from API.', 500);
//     } else {
//       return handleError(
//         res,
//         error.message || 'Error processing request.',
//         500
//       );
//     }
//   }
// });

// // Route to handle personalized chat API call
// app.post('/personalized/chat', async (req, res) => {
//   const {
//     message,
//     seed = 42,
//     model = 'openai',
//     temperature = 0.7,
//     max_tokens = 1000, // Fixed: Set realistic max_tokens value
//     top_p = 1.0,
//     frequency_penalty = 0.0,
//     presence_penalty = 0.0,
//     stop = ['\n'],
//     response_format = 'json_object',
//   } = req.body;

//   if (!message || typeof message !== 'string') {
//     return res
//       .status(400)
//       .json({ success: false, message: 'Message is required.' });
//   }

//   const data = {
//     messages: [
//       {
//         role: 'system',
//         content: SYSTEM_PROMPT,
//       },
//       {
//         role: 'user',
//         content: message,
//       },
//     ],
//     model: model,
//     seed: seed,
//     response_format: response_format,
//     temperature: temperature,
//     max_tokens: max_tokens,
//     top_p: top_p,
//     frequency_penalty: frequency_penalty,
//     presence_penalty: presence_penalty,
//     stop: stop,
//   };

//   const headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     'User-Agent': 'axios/1.7.9',
//   };

//   try {
//     const response = await axios.post(apiUrl, data, { headers });
//     console.log('response: ', response.data);

//     if (response.status === 200) {
//       return res.json({
//         success: true,
//         model: model,
//         seed: seed,
//         data: response.data,
//       });
//     } else {
//       return res.status(response.status).json({
//         success: false,
//         message: `Error: Received status code ${response.status}.`,
//       });
//     }
//   } catch (error) {
//     if (error.response) {
//       return res.status(error.response.status).json({
//         success: false,
//         message: error.response.data || 'Error processing request.',
//       });
//     } else if (error.request) {
//       return res.status(500).json({
//         success: false,
//         message: 'No response received from the API.',
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message:
//           error.message || 'An error occurred while processing the request.',
//       });
//     }
//   }
// });

// app.post('/personalized/chat', async (req, res) => {
//   const {
//     message,
//     seed = 42,
//     model = 'openai',
//     temperature = 0.7,
//     max_tokens = 1000,
//     top_p = 1.0,
//     frequency_penalty = 0.0,
//     presence_penalty = 0.0,
//     stop = ['\n'],
//     response_format = 'json_object',
//   } = req.body;

//   const data = {
//     messages: [
//       {
//         role: 'system',
//         content: SYSTEM_PROMPT_PERSONAL,
//       },
//       {
//         role: 'user',
//         content: message,
//       },
//     ],
//     model: model, // The model the user selected.
//     seed: seed, // You can modify or randomize the seed if needed.
//     response_format: response_format,
//     temperature: temperature,
//     max_tokens: max_tokens,
//     top_p: top_p,
//     frequency_penalty: frequency_penalty,
//     presence_penalty: presence_penalty,
//     stop: stop,
//   };

//   // Define headers for the API request.
//   const headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json, text/plain, */*',
//     'User-Agent': 'axios/1.7.9',
//   };

//   try {
//     // Make the POST request to the Pollinations API.
//     const response = await axios.post(apiUrl, data, { headers });
//     console.log('response: ', response);

//     // Check if the response is successful and return it to the client.
//     if (response.status === 200) {
//       return res.json({
//         success: true,
//         model: model,
//         seed: data.seed,
//         data: response.data,
//       });
//     } else {
//       return res.status(response.status).json({
//         success: false,
//         message: `Error: Received status code ${response.status}, ${response.data}`,
//       });
//     }
//   } catch (error) {
//     // Handle errors and return appropriate messages.
//     if (error.response) {
//       // If the API returns an error response.
//       return res.status(error.response.status).json({
//         success: false,
//         message: error.response.data || 'Error processing request.',
//       });
//     } else if (error.request) {
//       // If no response was received from the API.
//       return res.status(500).json({
//         success: false,
//         message: `No response received from ${APP_NAME} API.`,
//       });
//     } else {
//       // For other errors (e.g., network issues).
//       return res.status(500).json({
//         success: false,
//         message:
//           error.message || 'An error occurred while processing the request.',
//       });
//     }
//   }
// });

// // Export the app module for use in other files (e.g., server.js).
// module.exports = app;

// // Optionally, you can add a test route or server setup here if this is the entry point.
// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }
