import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Repeat2 } from 'lucide-react';
import { apiUrl, siteName } from '../../config/envConfig';
import { formatCustomDate } from '../../utils/date';
import ReactMarkdown from 'react-markdown';
import miniLogo from '../../assets/img/common/minilogo.png';
import { avatar8 } from '../../assets/img/blogpage';
import { prompttexLogoLite } from '../../assets/img/common';

const AIChatBot = () => {
  const chatVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const messageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: {
        data: `I am ${siteName}'s AI assistant. How can I help you today?`,
        message: 'Welcome Message',
        model: null,
        success: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('openai'); // Default model
  const [showFullResponse, setShowFullResponse] = useState(false); // Toggle for JSON display
  const chatContainerRef = useRef(null);

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

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return; // Prevent empty submissions
    setInput(''); // Clear input field

    const userMessage = {
      role: 'user',
      content: {
        data: input,
        timestamp: new Date().toLocaleTimeString(),
      },
    };
    setMessages(prev => [...prev, userMessage]); // Add user message to chat
    setLoading(true);

    try {
      // API call to backend
      const response = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, model }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: responseData, // Store the entire JSON response
          },
        ]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: {
            data: null,
            message: `Error: ${responseData.message || 'Something went wrong.'}`,
            success: false,
            timestamp: new Date().toLocaleTimeString(),
          },
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: {
            data: null,
            message:
              'Error: Unable to connect to the server. Please try again later.',
            success: false,
            timestamp: new Date().toLocaleTimeString(),
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear All Chat History
  const handleClearAll = async () => {
    try {
      const response = await fetch(`${apiUrl}/ai/clearall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message); // Debug message: Chat history cleared.
        setMessages([]); // Clear chat messages on the frontend
      } else {
        console.error('Failed to clear chat history.');
      }
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        <div className="flex sticky justify-end top-0 shadow-2xl border-b-4 border-b-purple-600 rounded-lg px-4 py-2 bg-gray-200 items-center">
          <div className="flex-shrink-0">
            <img
              src={prompttexLogoLite}
              alt="PromptTex Logo"
              className="size-16 rounded"
            />
          </div>
          <div className="ml-3">
            <p className="text-xl font-share-tech-mono font-medium text-gray-700">
              PromptTex
            </p>
            <h5 className="-my-1 text-black text-xxs">
              World-Class Prompt Generator for PromptArena
            </h5>

            <div className="-mt-1">
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
                  <option key={model.name} value={model.name}>
                    {model.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-grow">
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white  rounded-lg glass-panel disabled:cursor-not-allowed"
              >
                <Repeat2 className="text-shadow shadow-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex flex-col flex-grow p-2 h-0 chatBot overflow-x-hidden overflow-y-scroll"
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-shadow tracking-widest font-black text-sm">
                {' '}
                Start a conversation with {siteName}'s ChatBot
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div>
                <div>
                  {msg.role === 'user' ? (
                    <motion.div className="flex w-full overflow-hidden mt-2 space-x-3 max-w-xs ml-auto justify-end">
                      <div>
                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{msg.content.data}</p>
                        </div>
                        <span className="text-xs text-gray-100 leading-none">
                          {formatCustomDate(msg.timestamp, 'h:mm a')}
                        </span>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                        <img
                          src={avatar8}
                          alt="Generated Image"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={messageVariants}
                      className="flex w-full overflow-hidden mt-2 space-x-3 max-w-xs"
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                        <img
                          src={miniLogo}
                          alt="Generated Image"
                          className="w-full h-full p-[5px] rounded"
                        />
                      </div>
                      <div>
                        <div className="bg-gray-300 text-gray-800 p-3 rounded-r-lg rounded-bl-lg">
                          <p className="text-sm">
                            {/* <ReactMarkdown>
                              {msg.content.data || 'No data available.'}
                            </ReactMarkdown> */}
                            <ReactMarkdown
                              components={{
                                img: ({ node, ...props }) => {
                                  const [isLoading, setIsLoading] =
                                    React.useState(true);
                                  return (
                                    <>
                                      {isLoading && (
                                        <div className="w-full h-full flex items-center justify-center">
                                          Generating...{' '}
                                          <Loader2 className="animate-spin" />
                                        </div>
                                      )}
                                      <img
                                        {...props}
                                        alt="Generated Image"
                                        className={`${isLoading ? 'hidden' : 'block'} w-full h-full rounded`}
                                        onLoad={() => setIsLoading(false)}
                                      />
                                    </>
                                  );
                                },
                              }}
                            >
                              {msg.content.data || 'No data available.'}
                            </ReactMarkdown>
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
            <p className="text-gray-100 text-xs font-bold mb-2 tracking-wider inline-block">
              <span className="animate-bounce text-sm">🤖</span> Promptex is
              typing...
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
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
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
