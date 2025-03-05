import React, { createContext, useContext, useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

// Create a context to hold clarity methods
const ClarityContext = createContext(null);

// Custom hook to use clarity tracking methods
export const useClarity = () => {
  const context = useContext(ClarityContext);
  if (!context) {
    throw new Error('useClarity must be used within a ClarityProvider');
  }
  return context;
};

export const MicrosoftClarityProvider = ({ projectId, children }) => {
  // Initialize Clarity on mount
  useEffect(() => {
    if (projectId) {
      clarity.init(projectId);
    }
  }, [projectId]);

  // Define tracking methods that you might use throughout the app
  const identify = (userId, properties) => {
    if (clarity.hasStarted && clarity.hasStarted()) {
      clarity.identify(userId, properties);
    }
  };

  const consent = (value = true) => clarity.consent(value);
  const stop = () => clarity.stop();
  const start = () => clarity.start();
  const setTag = (key, value) => clarity.setTag(key, value);
  const setEvent = eventName => clarity.setEvent(eventName);
  const upgrade = reason => clarity.upgrade(reason);

  const clarityMethods = {
    identify,
    consent,
    stop,
    start,
    setTag,
    setEvent,
    upgrade,
  };

  return (
    <ClarityContext.Provider value={clarityMethods}>
      {children}
    </ClarityContext.Provider>
  );
};

export default MicrosoftClarityProvider;
