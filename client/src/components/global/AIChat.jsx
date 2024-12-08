import React, { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../../config/envConfig';

const AIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('mistral'); // Default model
  const chatContainerRef = useRef(null); // Ref to the chat container

  const availableModels = [
    { name: 'openai', description: 'OpenAI GPT-4o' },
    { name: 'mistral', description: 'Mistral Nemo' },
    { name: 'mistral-large', description: 'Mistral Large (v2)' },
    { name: 'llama', description: 'Llama 3.1' },
    { name: 'command-r', description: 'Command-R' },
    { name: 'unity', description: 'Unity with Mistral Large' },
    { name: 'midijourney', description: 'Midijourney Musical Transformer' },
    { name: 'rtist', description: 'Rtist Image Generator' },
    { name: 'searchgpt', description: 'SearchGPT with Real-Time News' },
    { name: 'evil', description: 'Evil Mode - Experimental' },
    { name: 'qwen-coder', description: 'Qwen Coder 32b Instruct' },
    { name: 'p1', description: 'Pollinations 1 (OptiLLM)' },
  ];

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent empty submissions

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]); // Add user message to chat
    setLoading(true);

    try {
      // Make a POST request to the backend
      const response = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, model }),
      });

      const responseData = await response.json();

      if (responseData.data && responseData.data.success) {
        const aiMessage = {
          role: responseData.data.role || 'assistant',
          content: responseData.data.data || 'No response provided.',
          timestamp: new Date(responseData.data.timestamp).toISOString(),
        };
        setMessages(prev => [...prev, aiMessage]); // Add AI response to chat
      } else {
        const errorMessage = {
          role: 'assistant',
          content: `Error: ${responseData.message || 'Something went wrong.'}`,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Error: Unable to connect to the server. Please try again later.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
      setInput(''); // Clear input field
    }
  };

  // Scroll to the bottom of the chat container whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex text-black flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <div>
          <label htmlFor="modelSelect" className="text-sm">
            Select Model:
          </label>
          <select
            id="modelSelect"
            value={model}
            onChange={e => setModel(e.target.value)}
            className="ml-2 p-1 bg-white text-black rounded"
          >
            {availableModels.map(model => (
              <option key={model.name} value={model.name}>
                {model.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Container */}
      <div
        ref={chatContainerRef} // Attach the ref to the chat container
        className="flex-1 overflow-y-auto p-4 bg-white"
        style={{ maxHeight: 'calc(100vh - 150px)' }} // Ensure proper height
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
              <span>{msg.content}</span>
            </p>
            <p className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        {loading && <p className="text-blue-500">AI is typing...</p>}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-gray-200 flex items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`ml-2 px-4 py-2 rounded text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChat;

// import React, { useState, useRef, useEffect } from 'react';
// import { usePollinationsChat } from '@pollinations/react';
// import ReactMarkdown from 'react-markdown';

// const AIChat = () => {
//   const [input, setInput] = useState('');
//   const [selectedModel, setSelectedModel] = useState('mistral'); // Default model
//   const [loading, setLoading] = useState(false); // Loading state
//   const chatContainerRef = useRef(null); // Ref for the chat container

//   const availableModels = [
//     { name: 'openai', description: 'OpenAI GPT-4o' },
//     { name: 'mistral', description: 'Mistral Nemo' },
//     { name: 'mistral-large', description: 'Mistral Large (v2)' },
//     { name: 'llama', description: 'Llama 3.1' },
//     { name: 'command-r', description: 'Command-R' },
//     { name: 'unity', description: 'Unity with Mistral Large' },
//     { name: 'midijourney', description: 'Midijourney Musical Transformer' },
//     { name: 'rtist', description: 'Rtist Image Generator' },
//     { name: 'searchgpt', description: 'SearchGPT with Real-Time News' },
//     { name: 'evil', description: 'Evil Mode - Experimental' },
//     { name: 'qwen-coder', description: 'Qwen Coder 32b Instruct' },
//     { name: 'p1', description: 'Pollinations 1 (OptiLLM)' },
//   ];

//   const { sendUserMessage, messages } = usePollinationsChat(
//     [
//       {
//         role: 'system',
//         content: 'You are a helpful assistant.',
//       },
//     ],
//     {
//       seed: 42, // Default seed
//       jsonMode: false,
//       model: selectedModel,
//     }
//   );

//   const handleSend = async () => {
//     if (!input) return;
//     setLoading(true); // Start loading
//     try {
//       await sendUserMessage(input);
//       setInput('');
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   // Automatically scroll to the bottom of the chat container when new messages are added
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="text-black p-4">
//       <h2 className="text-xl font-bold mb-4">AI Chat</h2>

//       {/* Model Selector */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Select AI Model:</label>
//         <select
//           value={selectedModel}
//           onChange={e => setSelectedModel(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         >
//           {availableModels.map(model => (
//             <option key={model.name} value={model.name}>
//               {model.description}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Chat Messages */}
//       <div
//         ref={chatContainerRef}
//         className="border border-gray-300 rounded p-4 mb-4 h-96 overflow-y-auto"
//         style={{ backgroundColor: '#f9f9f9' }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-3 p-2 rounded ${
//               msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
//             }`}
//           >
//             <strong>{msg.role}:</strong>
//             <ReactMarkdown>{msg.content}</ReactMarkdown>
//           </div>
//         ))}
//       </div>

//       {/* Input Field and Send Button */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="button"
//           onClick={handleSend}
//           className={`p-2 rounded text-white ${
//             loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AIChat;

// import React, { useState } from 'react';
// import { usePollinationsChat } from '@pollinations/react';
// import ReactMarkdown from 'react-markdown';
// const AIChat = () => {
//   const [input, setInput] = useState('');
//   const { sendUserMessage, messages } = usePollinationsChat(
//     [
//       {
//         role: 'system',
//         content: 'You are a helpful assistant.',
//       },
//     ],
//     {
//       seed: 42,
//       jsonMode: false,
//       model: 'mistral',
//     }
//   );

//   const handleSend = () => {
//     sendUserMessage(input);
//     setInput('');
//   };

//   return (
//     <div>
//       <div className="text-black">
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.role}:</strong>
//             <br />
//             <small>{msg.timestamp}</small>
//             <ReactMarkdown>{msg.content}</ReactMarkdown>
//           </p>
//         ))}
//       </div>
//       <input value={input} onChange={e => setInput(e.target.value)} />
//       <button type="button" className="bg-blue-500" onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default AIChat;
