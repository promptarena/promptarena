import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

const BlogHero = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause status
  const videoRef = useRef(null); // Ref to control the video

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause(); // Pause video
    } else {
      videoRef.current.play(); // Play video
    }
    setIsPlaying(!isPlaying); // Toggle play/pause state
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock The Power Of{' '}
            <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
              ChatenAI AI
            </span>{' '}
            With{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Smartest AI
            </span>
          </h1>

          <div className="relative w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border"
              style={{
                clipPath:
                  'path("M0,0 L100%,0 L100%,calc(100% - 20px) L95%,100% L5%,100% L0,calc(100% - 20px) Z")',
              }}
            >
              <video
                ref={videoRef} // Set ref for video control
                src="https://aikeu.netlify.app/images/video.mp4"
                loop
                muted
                alt="AI Demo"
                className="w-full object-cover m-1 rounded-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayPause} // Toggle play/pause on click
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" /> // Show pause icon if playing
                    ) : (
                      <Play className="w-8 h-8 text-white" /> // Show play icon if paused
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogHero;
