import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  StopCircle,
  Volume,
  VolumeX,
  Fullscreen,
  Minimize,
  Rewind,
  FastForward,
  Repeat,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ videoSrc, playlist = [] }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = e => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleProgress = () => {
    const currentTime = videoRef.current.currentTime;
    setProgress((currentTime / videoRef.current.duration) * 100);
    setCurrentTimestamp(formatTime(currentTime));
  };

  const handleSeek = e => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const changePlaybackSpeed = speed => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleLoop = () => {
    videoRef.current.loop = !loop;
    setLoop(!loop);
  };

  const jump = seconds => {
    videoRef.current.currentTime += seconds;
  };

  const playNext = () => {
    const nextIndex = (currentVideoIndex + 1) % playlist.length;
    setCurrentVideoIndex(nextIndex);
  };

  const playPrevious = () => {
    const previousIndex =
      (currentVideoIndex - 1 + playlist.length) % playlist.length;
    setCurrentVideoIndex(previousIndex);
  };

  useEffect(() => {
    const video = videoRef.current;

    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('loadedmetadata', () => {
      setTotalDuration(formatTime(video.duration));
    });

    return () => {
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('loadedmetadata', () => {});
    };
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      videoRef.current.src = playlist[currentVideoIndex];
      setIsPlaying(false);
    }
  }, [currentVideoIndex, playlist]);

  return (
    <>
      <div
        className="video-player-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%', // Ensures the container is fully responsive
          margin: '0 auto',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden', // Prevents content overflow
        }}
      >
        <video
          ref={videoRef}
          src={playlist.length > 0 ? playlist[0] : videoSrc}
          className="rounded-t-lg"
          width="100%"
          height="auto"
          style={{
            objectFit: 'cover', // Ensures the video scales well
            display: 'block',
            width: '100%',
          }}
        />
        {/* Playlist Navigation */}
        {playlist.length > 1 && (
          <div
            className="playlist-controls md:px-5 px-3 mb:bottom-10 bottom-14 absolute inset-0"
            style={{
              //   position: 'absolute',
              //   bottom: '10px',
              //   left: '10px',
              //   right: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              //   marginTop: '10px',
              color: '#fff',
              flexWrap: 'wrap',
              //   gap: '10px',
              //   padding: '0 10px', // Add padding for smaller screens
            }}
          >
            <button onClick={playPrevious} style={{ flexShrink: 0 }}>
              <ChevronLeft className="bg-black/30 rounded md:w-14 w-8 h-8 md:h-14 backdrop-blur-sm" />
            </button>
            <button onClick={playNext} style={{ flexShrink: 0 }}>
              <ChevronRight className="bg-black/30 rounded md:w-14 w-8 h-8 md:h-14 backdrop-blur-sm" />
            </button>
          </div>
        )}

        <div
          className="controls md: md:bottom-10 rounded-b-lg md:gap-[10px] gap-1 border-t-gray-600/30 border-t-2"
          style={{
            // position: 'absolute',
            // bottom: '10px',
            left: '10px',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            // borderRadius: '8px',
            flexWrap: 'wrap', // Allows controls to wrap on smaller screens
            // gap: '10px',
          }}
        >
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {isPlaying ? (
              <Pause size={24} color="#fff" />
            ) : (
              <Play size={24} color="#fff" />
            )}
          </motion.button>

          {/* Stop Button */}
          <button
            onClick={stopPlayback}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <StopCircle size={24} color="#fff" />
          </button>

          {/* Timestamp Display */}
          <span style={{ color: '#fff', fontSize: '14px', flexShrink: 0 }}>
            {currentTimestamp} / {totalDuration}
          </span>

          {/* Progress Bar */}
          <input
            ref={progressBarRef}
            type="range"
            min="0"
            max="100"
            className="bg-gray-400 h-1 rounded-full accent-slate-500"
            value={progress}
            onChange={handleSeek}
            style={{
              width: '100%',
              maxWidth: '150px', // Limit width on smaller screens
              flexGrow: 1,
            }}
          />

          {/* Volume Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <button
              onClick={toggleMute}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isMuted ? (
                <VolumeX size={24} color="#fff" />
              ) : (
                <Volume size={24} color="#fff" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              className="bg-gray-500 h-1 rounded-full accent-slate-500"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: '80px',
                // marginLeft: '10px',
              }}
            />
          </motion.div>

          {/* Playback Speed */}
          <select
            value={playbackSpeed}
            onChange={e => changePlaybackSpeed(Number(e.target.value))}
            className="custom-select bg-gray-50 md:px-3 p-0 outline-none text-gray-900 text-sm rounded"
            style={{
              border: '1px solid #fff',
              flexShrink: 0,
            }}
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>

          {/* Loop */}
          <button
            onClick={toggleLoop}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Repeat size={24} color={loop ? '#f00' : '#fff'} />
          </button>

          {/* Jump Forward/Backward */}
          <button
            onClick={() => jump(-5)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Rewind size={24} color="#fff" />
          </button>
          <button
            onClick={() => jump(5)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <FastForward size={24} color="#fff" />
          </button>

          {/* Fullscreen Button */}
          <motion.button
            onClick={toggleFullscreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {isFullscreen ? (
              <Minimize size={24} color="#fff" />
            ) : (
              <Fullscreen size={24} color="#fff" />
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;

// export default VideoPlayer;
// import React, { useRef, useState, useEffect } from 'react';
// import {
//   Play,
//   Pause,
//   StopCircle,
//   Volume,
//   VolumeX,
//   Fullscreen,
//   Minimize,
//   Rewind,
//   FastForward,
//   Repeat,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// const VideoPlayer = ({ videoSrc, playlist = [] }) => {
//   const videoRef = useRef(null);
//   const progressBarRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [loop, setLoop] = useState(false);
//   const [currentTimestamp, setCurrentTimestamp] = useState('00:00');
//   const [totalDuration, setTotalDuration] = useState('00:00');
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const formatTime = time => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, '0');
//     return `${minutes}:${seconds}`;
//   };

//   const togglePlay = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const stopPlayback = () => {
//     videoRef.current.pause();
//     videoRef.current.currentTime = 0;
//     setIsPlaying(false);
//     setProgress(0);
//   };

//   const toggleMute = () => {
//     videoRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const handleVolumeChange = e => {
//     const newVolume = e.target.value;
//     setVolume(newVolume);
//     videoRef.current.volume = newVolume;
//   };

//   const handleProgress = () => {
//     const currentTime = videoRef.current.currentTime;
//     setProgress((currentTime / videoRef.current.duration) * 100);
//     setCurrentTimestamp(formatTime(currentTime));
//   };

//   const handleSeek = e => {
//     const seekTime = (e.target.value / 100) * videoRef.current.duration;
//     videoRef.current.currentTime = seekTime;
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) {
//       document.exitFullscreen();
//     } else {
//       videoRef.current.requestFullscreen();
//     }
//     setIsFullscreen(!isFullscreen);
//   };

//   const changePlaybackSpeed = speed => {
//     videoRef.current.playbackRate = speed;
//     setPlaybackSpeed(speed);
//   };

//   const toggleLoop = () => {
//     videoRef.current.loop = !loop;
//     setLoop(!loop);
//   };

//   const jump = seconds => {
//     videoRef.current.currentTime += seconds;
//   };

//   const playNext = () => {
//     const nextIndex = (currentVideoIndex + 1) % playlist.length;
//     setCurrentVideoIndex(nextIndex);
//   };

//   const playPrevious = () => {
//     const previousIndex =
//       (currentVideoIndex - 1 + playlist.length) % playlist.length;
//     setCurrentVideoIndex(previousIndex);
//   };

//   useEffect(() => {
//     const video = videoRef.current;

//     video.addEventListener('timeupdate', handleProgress);
//     video.addEventListener('loadedmetadata', () => {
//       setTotalDuration(formatTime(video.duration));
//     });

//     return () => {
//       video.removeEventListener('timeupdate', handleProgress);
//       video.removeEventListener('loadedmetadata', () => {});
//     };
//   }, []);

//   useEffect(() => {
//     if (playlist.length > 0) {
//       videoRef.current.src = playlist[currentVideoIndex];
//       setIsPlaying(false);
//     }
//   }, [currentVideoIndex, playlist]);

//   return (
//     <div
//       className="video-player-container"
//       style={{ position: 'relative', width: '100%', maxWidth: '800px' }}
//     >
//       <video
//         ref={videoRef}
//         src={playlist.length > 0 ? playlist[0] : videoSrc}
//         width="100%"
//         height="auto"
//         style={{
//           borderRadius: '10px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//         }}
//       />
//       <div
//         className="controls"
//         style={{
//           position: 'absolute',
//           bottom: '10px',
//           left: '10px',
//           right: '10px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '10px',
//           backgroundColor: 'rgba(0, 0, 0, 0.6)',
//           borderRadius: '8px',
//         }}
//       >
//         {/* Play/Pause Button */}
//         <motion.button
//           onClick={togglePlay}
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           {isPlaying ? (
//             <Pause size={24} color="#fff" />
//           ) : (
//             <Play size={24} color="#fff" />
//           )}
//         </motion.button>

//         {/* Stop Button */}
//         <button
//           onClick={stopPlayback}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <StopCircle size={24} color="#fff" />
//         </button>

//         {/* Timestamp Display */}
//         <span style={{ color: '#fff', fontSize: '14px' }}>
//           {currentTimestamp} / {totalDuration}
//         </span>

//         {/* Progress Bar */}
//         <input
//           ref={progressBarRef}
//           type="range"
//           min="0"
//           max="100"
//           value={progress}
//           onChange={handleSeek}
//           style={{ width: '30%' }}
//         />

//         {/* Volume Controls */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           style={{ display: 'flex', alignItems: 'center' }}
//         >
//           <button
//             onClick={toggleMute}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             {isMuted ? (
//               <VolumeX size={24} color="#fff" />
//             ) : (
//               <Volume size={24} color="#fff" />
//             )}
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//             style={{ width: '100px', marginLeft: '10px' }}
//           />
//         </motion.div>

//         {/* Playback Speed */}
//         <select
//           value={playbackSpeed}
//           onChange={e => changePlaybackSpeed(Number(e.target.value))}
//           style={{
//             color: '#fff',
//             backgroundColor: 'transparent',
//             border: '1px solid #fff',
//             borderRadius: '4px',
//             padding: '4px',
//           }}
//         >
//           <option value="0.5">0.5x</option>
//           <option value="1">1x</option>
//           <option value="1.5">1.5x</option>
//           <option value="2">2x</option>
//         </select>

//         {/* Loop */}
//         <button
//           onClick={toggleLoop}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <Repeat size={24} color={loop ? '#f00' : '#fff'} />
//         </button>

//         {/* Jump Forward/Backward */}
//         <button
//           onClick={() => jump(-5)}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <Rewind size={24} color="#fff" />
//         </button>
//         <button
//           onClick={() => jump(5)}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <FastForward size={24} color="#fff" />
//         </button>

//         {/* Fullscreen Button */}
//         <motion.button
//           onClick={toggleFullscreen}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           {isFullscreen ? (
//             <Minimize size={24} color="#fff" />
//           ) : (
//             <Fullscreen size={24} color="#fff" />
//           )}
//         </motion.button>
//       </div>

//       {/* Playlist Navigation */}
//       {playlist.length > 1 && (
//         <div
//           className="playlist-controls"
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             marginTop: '10px',
//             color: '#fff',
//           }}
//         >
//           <button onClick={playPrevious}>
//             <ChevronLeft size={24} color="#fff" />
//           </button>
//           <button onClick={playNext}>
//             <ChevronRight size={24} color="#fff" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;
