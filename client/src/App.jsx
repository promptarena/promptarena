// App.js
import React, { useMemo } from 'react';
import Router from './Router';
import { Toaster } from 'react-hot-toast';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomScrollWrapper from './components/base/CustomScrollBar';
import { AnalyticsProvider } from './contexts/analyticsContext';
import ScrollToTop from './components/global/ScrollToTop';

const App = () => {
  useSmoothScroll(); // Initialize smooth scrolling

  const memoizedToaster = useMemo(() => <Toaster />, []);

  return (
    <CustomScrollWrapper>
      <AnalyticsProvider>
        {/* Main application routing */}
        <ScrollToTop />
        <Router />
        {/* Toast notifications */}
        {memoizedToaster}
      </AnalyticsProvider>
    </CustomScrollWrapper>
  );
};

export default App;
