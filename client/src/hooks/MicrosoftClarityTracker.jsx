import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { clarity } from 'react-microsoft-clarity';

const ClarityTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if clarity is initialized before tracking
    if (clarity.hasStarted && clarity.hasStarted()) {
      clarity.setEvent('page-view');
      console.log('Page view tracked:', location.pathname);
    } else {
      console.warn(
        'Clarity is not initialized yet. Skipping event tracking for:',
        location.pathname
      );
    }
  }, [location]);

  return null;
};

export default ClarityTracker;
