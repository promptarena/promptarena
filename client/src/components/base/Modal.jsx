// src/components/base/Modal.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the modal
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener on close or unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = event => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // Render the modal only if isOpen is true
  if (!isOpen) {
    return null;
  }

  // Create a portal to render the modal outside of the main app container (usually to the body)
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Semi-transparent backdrop overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 transition-opacity"
        aria-hidden="true"
      ></div>

      {/* Modal content */}
      <div
        ref={modalRef} // Attach ref to the modal content for click outside detection
        className="relative w-auto my-6 mx-auto max-w-3xl"
      >
        {/* Modal card */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Modal header (optional) */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            {/* Modal title (replace with your title) */}
            <h3 className="text-3xl font-semibold">Modal Title</h3>

            {/* Close button */}
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>

          {/* Modal body (your content goes here) */}
          <div className="relative p-6 flex-auto">{children}</div>

          {/* Modal footer (optional) */}
          {/* <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Save Changes
            </button>
          </div> */}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
