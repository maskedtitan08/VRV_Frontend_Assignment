import React from 'react';
import { RBACProvider } from './RBACContext';
import DashboardLayout from './DashboardLayout';

const App = () => {
  return (
    <RBACProvider>
      <DashboardLayout />
    </RBACProvider>
  );
};

export default App;