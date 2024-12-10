// import { Search, Scissors, Share2, Download } from 'lucide-react';
// import { useState } from 'react';

// export default function AIImageAndTextGenerator() {
//   const [activeTab, setActiveTab] = useState('image');

//   return (
//     <div className="min-h-screen dark:bg-dark-background bg-background text-text dark:text-dark-text overflow-hidden p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Tab Toggle */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
//             <button
//               onClick={() => setActiveTab('image')}
//               className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
//                 activeTab === 'image'
//                   ? 'bg-[#7C3AED] text-white'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               Image to Video
//             </button>
//             <button
//               onClick={() => setActiveTab('text')}
//               className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
//                 activeTab === 'text'
//                   ? 'bg-[#7C3AED] text-white'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               Text to Video
//             </button>
//           </div>
//         </div>

// <div className="grid md:grid-cols-2 gap-8">
//   {/* Left Column - Preview */}
//   <div className="relative">
//     <div className="aspect-[4/3] rounded-lg overflow-hidden">
//       <img
//         src="https://images.unsplash.com/photo-1515405295579-ba7b45403062"
//         alt="Cyberpunk cityscape"
//         className="w-full h-full object-cover"
//       />
//     </div>

//     {/* Action Buttons */}
//     <div className="flex justify-center gap-4 mt-6">
//       <button className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
//         <Search className="w-5 h-5 text-gray-600" />
//       </button>
//       <button className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
//         <Scissors className="w-5 h-5 text-gray-600" />
//       </button>
//       <button className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
//         <Share2 className="w-5 h-5 text-gray-600" />
//       </button>
//       <button className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
//         <Download className="w-5 h-5 text-gray-600" />
//       </button>
//     </div>
//   </div>

//   {/* Right Column - Controls */}
//   <div className="space-y-6">
//     <div className="glassEffect p-6 rounded-xl shadow-sm">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white font-medium">
//           1
//         </div>
//         <h2 className="text-gray-100 text-lg font-medium">
//           Upload image to generate a video
//         </h2>
//       </div>
//       <div className="border-2 border-gray-200 rounded-lg p-4">
//         <label className="block text-gray-200 font-medium mb-2">
//           Enter Your Prompt:
//         </label>
//         <textarea
//           className="w-full h-24 resize-none border-0 rounded-md text-black focus:outline-none focus:px-2 focus:ring-0 p-0"
//           placeholder=""
//         />
//       </div>
//     </div>

//     <div className="glassEffect p-6 rounded-xl shadow-sm">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white font-medium">
//           2
//         </div>
//         <h2 className="text-gray-100 text-lg font-medium">
//           Click Generate Video to start
//         </h2>
//       </div>
//       <button className="w-full bg-[#7C3AED] text-white py-4 rounded-full font-medium hover:bg-[#6D2AED] transition-colors">
//         Generate Video
//       </button>
//       <p className="text-gray-300 text-sm text-center mt-4">
//         © This video is free for commercial use.
//       </p>
//     </div>
//   </div>
// </div>
//       </div>
//     </div>
//   );
// }

import { Search, Scissors, Share2, Download } from 'lucide-react';
import { useState } from 'react';
import AIImage from './AIImage';
import AIChat from './AIChat';
import AIChatBot from './AIChatBot';

export default function AIImageAndTextGenerator() {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="dark:bg-dark-background bg-background text-text dark:text-dark-text">
      <div className="min-h-screen overflow-hidden container pt-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-1 mb-5 ">
            <h2 className="h1 font-bold font-syncopate">
              <span className="text-[#9857D3] uppercase">AI</span>{' '}
              <span className="text-white uppercase">
                Image and Text Generator
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Generate captivating visuals and engaging text with our AI-powered
              tools. Create captivating visuals and engaging text with our
              AI-powered tools.
            </p>
          </div>
          {/* Tab Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'image'
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Text to Image
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'text'
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Text to Text
              </button>
            </div>
          </div>

          <>
            {/* Left Column - Preview */}
            <div className="grid relative grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conditionally render based on activeTab */}
              {activeTab === 'image' ? (
                <>
                  <AIImage />
                </>
              ) : (
                <>
                  <AIChatBot />
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
