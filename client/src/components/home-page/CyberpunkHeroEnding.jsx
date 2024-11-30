import { Sparkles, Play, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../../components/base/Input';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { roboGirlRight, roboGirlStraight } from '../../assets/img/homepage';

export default function CyberpunkHeroEnding() {
  const { subscribeToNewsletter, isLoading } = useNewsletterStore();

  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await subscribeToNewsletter(email);
      setEmail('');
    } catch (error) {
      toast.error(error.message || 'Subscription failed');
    }
  };

  return (
    <>
      <div className="w-full bg-gradient-to-b from-transparent  via-purple-900/40 to-teal-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-0 relative">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-0 items-end">
            {/* Left Character */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative sm:block hidden"
            >
              <img
                src={roboGirlRight}
                alt="Cyberpunk character with metallic helmet"
                className="w-full h-auto object-cover rounded-lg scale-[1.2] pb-9"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent mix-blend-overlay" /> */}
            </motion.div>

            {/* Central Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-10 sm:mb-1 px-4 sm:pb-5 py-5 md:px-8"
            >
              <h1 className="h2 font-bold text-white mb-6 leading-tight">
                {/* Maximize Your Creative Output with AI Editing */}
                Refine Your AI Creations with Precision Editing
              </h1>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                {/* Spend just a few minutes to generate and refine stunning images
                and videos using our AI-powered tools. Enhance your visuals with
                precise edits, tailored to your needs. */}
                Never miss a prompt! Sign up for our newsletter and receive
                regular updates on new free prompts, exclusive AI resources, and
                inspiring creations in your inbox.
              </p>
              {/* <div className="flex flex-col w-[60%] mx-auto gap-0 justify-center">
                <Input
                  icon={Mail}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    color: '#fff',
                    borderRadius: '9999px',
                  }}
                  classNamesForInputTag="w-full px-10 pl-10 text-xs h-9 ring-1 ring-gray-100/20 bg-black/20 rounded-full"
                  type="email"
                  placeholder="Email Address"
                  // value={email}
                  // onChange={e => setEmail(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center sm:w-[60%] mx-auto justify-center px-8 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join with us
                </motion.button>
              </div> */}

              <>
                <form
                  onSubmit={handleSubmit}
                  className="relative mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-0"
                  />

                  <button
                    type="submit"
                    className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-400 px-4 py-2 text-sm font-medium text-gray-900 transition-transform active:scale-[0.985]"
                  >
                    {/* {isLoading ? (
                      <>
                        <span>Joining Waitlist</span>
                        <Loader2 className=" w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </>
                    )} */}
                    <>
                      <span>Join Waitlist</span>
                      {isLoading ? (
                        <Loader2 className=" w-4 h-4 animate-spin" />
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      )}
                    </>
                  </button>
                </form>
              </>
            </motion.div>

            {/* Right Character */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={roboGirlStraight}
                alt="Cyberpunk character with pink helmet"
                className="w-full h-auto object-cover scale-125 pb-8 rounded-lg"
              />
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-900/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,rgba(124,58,237,0)_40%)] pointer-events-none" />
        </div>
      </div>
    </>
  );
}

// import { Sparkles, Play } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function CyberpunkHeroEnding() {
//   return (
//     <>
//       <div className="w-full bg-gradient-to-b from-transparent  via-purple-900/40 to-teal-900 relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-0 relative">
//           <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-0 items-end">
//             {/* Left Character */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <img
//                 src="https://images.piclumen.com/normal/20241104/88252/da8acfa0-4818-49f2-9754-68725a4d85ba.webp"
//                 alt="Cyberpunk character with metallic helmet"
//                 className="w-full h-auto object-cover rounded-lg scale-[1.2] pb-9"
//               />
//               {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent mix-blend-overlay" /> */}
//             </motion.div>

//             {/* Central Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-center mb-1 px-4 pb-5 md:px-8"
//             >
//               <h1 className="h2 font-bold text-white mb-6 leading-tight">
//                 Maximize Your Creative Output with AI Editing
//               </h1>
//               <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Spend just a few minutes to generate and refine stunning images
//                 and videos using our AI-powered tools. Enhance your visuals with
//                 precise edits, tailored to your needs.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center px-8 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   GENERATE NOW
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* Right Character */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <img
//                 src="https://images.piclumen.com/normal/20241104/88252/eb1fccf3-2e3b-46e3-9357-068b2ac5c117.webp"
//                 alt="Cyberpunk character with pink helmet"
//                 className="w-full h-auto object-cover scale-125 pb-8 rounded-lg"
//               />
//             </motion.div>
//           </div>

//           {/* Background Effects */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-900/20 pointer-events-none" />
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,rgba(124,58,237,0)_40%)] pointer-events-none" />
//         </div>
//       </div>
//     </>
//   );
// }
