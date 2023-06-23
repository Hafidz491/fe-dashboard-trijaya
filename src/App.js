import React from 'react';

import Router from './Route';
import { AuthProvider } from './Utils/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
