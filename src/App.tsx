import React from 'react';
import { LandingPage } from './components/LandingPage';
import { useMidnight } from './hooks/useMidnight';

export const App: React.FC = () => {
  const midnight = useMidnight();

  return <LandingPage midnight={midnight} />;
};

export default App;
