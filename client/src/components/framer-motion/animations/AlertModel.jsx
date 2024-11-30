// // AlertModel.jsx
// import { AnimatePresence, motion } from 'framer-motion';
// import { FiAlertCircle } from 'react-icons/fi';

// const AlertModal = ({ isOpen, setIsOpen, message, onConfirm }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//           className="bg-slate-900/90 backdrop-blur p-8 h-screen fixed inset-0 z-[999] grid place-items-center overflow-hidden cursor-pointer"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: '12.5deg' }}
//             animate={{ scale: 1, rotate: '0deg' }}
//             exit={{ scale: 0, rotate: '0deg' }}
//             onClick={e => e.stopPropagation()}
//             className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//           >
//             <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
//             <div className="relative z-10">
//               <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
//                 <FiAlertCircle />
//               </div>
//               <h3 className="text-3xl font-bold text-center mb-2">
//                 {onConfirm ? 'Confirmation' : 'Alert'}
//               </h3>
//               <p className="text-center mb-6">
//                 {message || 'An action requires your confirmation.'}
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
//                 >
//                   {onConfirm ? 'Cancel' : 'Close'}
//                 </button>
//                 {onConfirm && (
//                   <button
//                     onClick={() => {
//                       onConfirm();
//                       setIsOpen(false);
//                     }}
//                     className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
//                   >
//                     Confirm
//                   </button>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AlertModal;

import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { useEffect } from 'react';

const AlertModal = ({ isOpen, setIsOpen, message, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Remove margins or padding on body or html elements
      document.body.style.margin = '0';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
    } else {
      // Reset styles when modal is closed
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    }

    // Cleanup styles when the modal is unmounted
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] backdrop-blur-sm cursor-pointer"
          style={{
            width: '100vw', // Full width of the viewport
            height: '100vh', // Full height of the viewport
            display: 'grid',
            placeItems: 'center', // Center the modal content
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()} // Prevent click from closing the modal
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg shadow-xl max-w-lg w-full cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                {onConfirm ? 'Confirmation' : 'Alert'}
              </h3>
              <p className="text-center mb-6">
                {message || 'An action requires your confirmation.'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  {onConfirm ? 'Cancel' : 'Close'}
                </button>
                {onConfirm && (
                  <button
                    onClick={() => {
                      onConfirm();
                      setIsOpen(false);
                    }}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
