// App.js
import React, { useMemo } from 'react';
import Router from './Router';
import { Toaster } from 'react-hot-toast';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomScrollWrapper from './components/base/CustomScrollBar';

const App = () => {
  useSmoothScroll(); // Initialize smooth scrolling

  const memoizedToaster = useMemo(() => <Toaster />, []);

  return (
    <CustomScrollWrapper>
      {/* Main application routing */}
      <Router />

      {/* Toast notifications */}
      {memoizedToaster}
    </CustomScrollWrapper>
  );
};

export default App;
