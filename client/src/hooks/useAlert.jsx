// useAlert.js
import { useState } from 'react';
import AlertModal from '../components/framer-motion/animations/AlertModel';

const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);

  const customAlert = msg => {
    setMessage(msg);
    setOnConfirm(null); // No confirmation action needed
    setIsOpen(true);
  };

  const customConfirm = (msg, onConfirmAction) => {
    setMessage(msg);
    setOnConfirm(() => onConfirmAction); // Set the confirm action
    setIsOpen(true);
  };

  const AlertModalComponent = (
    <AlertModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      message={message}
      onConfirm={onConfirm}
    />
  );

  return { customAlert, customConfirm, AlertModalComponent };
};

export default useAlert;
