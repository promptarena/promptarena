import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Download,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from 'lucide-react';
import { apiUrl, siteName } from '../../config/envConfig';
import {
  formatCustomDate,
  formatDate,
  formatRelativeTime,
} from '../../utils/date';
import ReactMarkdown from 'react-markdown';
import axiosInstance from '../../services/axiosInstance';

const AIChatBot = () => {
  const chatVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  const messageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const userMessageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `I am ${siteName}'s AI assistant. I will answer your questions about ${siteName}.`,
    },
  ]);
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
      const response = await axiosInstance.post("/ai/chat", {
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
          model: responseData.data.model,
          message: responseData.data.message,
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
      console.log( error);
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

  console.log('messages: ', messages);

  return (
    <>
      <div>some content will come here</div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={chatVariants}
        className="flex flex-col glassEffect flex-grow w-full h-[80vh] chatBot max-w-md bg-white shadow-xl rounded-lg overflow-hidden"
      >
        {/* Chat Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          className="flex sticky top-0 shadow-2xl border-b-4 border-b-purple-600 rounded-lg px-4 py-2 bg-gray-200 items-center"
        >
          <div className="flex-shrink-0">
            <img
              src={
                'https://images.unsplash.com/photo-1515405295579-ba7b45403062'
              }
              alt="Generated Image"
              className="w-12 h-12 rounded"
            />
          </div>
          <div className="ml-3">
            <p className="text-xl font-share-tech-mono font-medium text-gray-500">
              {siteName}'s ChatBot
            </p>
            <div className="-mt-2">
              <label htmlFor="modelSelect" className=" text-black text-xxs">
                Select Model You Want:
              </label>

              <select
                id="modelSelect"
                value={model}
                onChange={e => setModel(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs text-[0.55rem] rounded focus:ring-blue-500 focus:border-blue-500 block sm:w-[55%] w-[50%] px-1 py-[0.0.2rem] dark:bg-gray-10 dark:text-gray-700 font-semibold focus:outline-none transform duration-slow dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {availableModels.map(model => (
                  <option key={model.name} value={model.name.toLowerCase()}>
                    {model.description}
                  </option>
                ))}
              </select>
              {/* <p className="text-gray-900 text-xxs  tracking-wider bg-cyber-green inline-block w-[5rem] text-center badge">
                Online
              </p> */}
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex flex-col flex-grow p-2 h-0 chatBot overflow-x-hidden overflow-y-scroll"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div>
                <div>
                  {msg.role === 'user' ? (
                    <motion.div
                      variants={userMessageVariants}
                      className="flex w-full overflow-hidden mt-2 space-x-3 max-w-xs ml-auto justify-end"
                    >
                      <div>
                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <span className="text-xs text-gray-100 leading-none">
                          {formatCustomDate(msg.timestamp, 'h:mm a')}
                        </span>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={messageVariants}
                      className="flex w-full overflow-hidden mt-2 space-x-3 max-w-xs"
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                      <div>
                        <div className="bg-gray-300 text-gray-800 p-3 rounded-r-lg rounded-bl-lg">
                          <p className="text-sm">
                          {msg.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-100 leading-none">
                          {formatCustomDate(msg.timestamp, 'h:mm a')}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-gray-100 text-xs mb-2 tracking-wider inline-block">
              AI is typing...
            </p>
          )}
        </div>

        {/* Input Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={inputVariants}
          className="bg-gray-300"
        >
          <div className="relative p-2">
            <motion.input
              value={input}

              onChange={e => setInput(e.target.value)}
              whileTap={{ scale: 0.9 }}
              type="text"
              placeholder="Type your message..."
              className="block w-full border rounded-xl bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-1 ring-transparent transition placeholder:text-neutral-500 border-neutral-950 focus:border-fuchsia-700 focus:outline-none focus:ring-neutral-950/5"
            />
            <div className="absolute inset-y-1 top-[0.89rem] right-4 flex justify-end">
              <motion.button
                onClick={handleSend}
                disabled={loading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                aria-label="Submit"
                className={`flex aspect-square h-[80%] items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 ${loading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  ></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AIChatBot;

// import {
//   ArrowLeftFromLine,
//   ArrowRightFromLine,
//   Download,
//   RectangleHorizontal,
//   RectangleVertical,
//   Square,
// } from 'lucide-react';
// import React from 'react';
// import { siteName } from '../../config/envConfig';

// const AIChatBot = () => {
//   return (
//     <>
//       <div>this is dummy content</div>
//       <div className="flex flex-col glassEffect flex-grow w-full h-[80vh] chatBot max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
//         {/* Chat Header */}
//         <div className="flex sticky top-0 shadow-2xl  border-b-2 border-b-purple-600 rounded-lg p-4 bg-white items-center">
//           {/* <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
//           <div className="flex-shrink-0">
//             <img
//               src={
//                 'https://images.unsplash.com/photo-1515405295579-ba7b45403062'
//               }
//               alt="Generated Image"
//               className="w-12 h-12 rounded-full"
//             />
//           </div>
//           <div className="ml-3">
//             <p className="text-xl font-share-tech-mono font-medium text-gray-500">
//               {siteName}'s ChatBot
//             </p>
//             <p className="text-gray-900 text-xs tracking-wider bg-cyber-green inline badge">Online</p>
//           </div>
//         </div>
//         <div className="flex flex-col flex-grow p-2 h-0 chatBot overflow-auto">
//           <div className="flex w-full mt-2 space-x-3 max-w-xs">
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//             <div>
//               <div className="bg-gray-300 text-gray-800 p-3 rounded-r-lg rounded-bl-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//           </div>
//           <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//           <div className="flex w-full  mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">Lorem ipsum dolor sit amet.</p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//           <div className="flex w-full text-gray-800 mt-2 space-x-3 max-w-xs">
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//             <div>
//               <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//           </div>
//           <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//           <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod tempor incididunt.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//           <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">Lorem ipsum dolor sit amet.</p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//           <div className="flex text-gray-800 w-full mt-2 space-x-3 max-w-xs">
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//             <div>
//               <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
//                 <p className="text-sm">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//           </div>
//           <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
//             <div>
//               <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
//                 <p className="text-sm">Lorem ipsum dolor sit.</p>
//               </div>
//               <span className="text-xs text-gray-100 leading-none">
//                 2 min ago
//               </span>
//             </div>
//             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
//           </div>
//         </div>

//         <div className="bg-gray-300">
//           <div className="relative p-2">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="block w-full border rounded-xl bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-1 ring-transparent transition placeholder:text-neutral-500 border-neutral-950 focus:border-fuchsia-700 focus:outline-none focus:ring-neutral-950/5"
//             />
//             <div className="absolute inset-y-1 top-[0.89rem] right-4 flex justify-end">
//               <button
//                 type="submit"
//                 aria-label="Submit"
//                 className="flex aspect-square h-[80%] items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
//               >
//                 <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
//                   <path
//                     fill="currentColor"
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M16 3 10 .5v2H0v1h10v2L16 3Z"
//                   ></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AIChatBot;
