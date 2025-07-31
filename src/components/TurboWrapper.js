import React from 'react';
import useTurboNavigation from '../hooks/useTurboNavigation';

const TurboWrapper = ({ children }) => {
  useTurboNavigation();
  return children;
};

export default TurboWrapper;