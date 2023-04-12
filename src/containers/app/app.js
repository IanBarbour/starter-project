import React from 'react';
import UserProvider from 'contexts/userContext';
import AppRouter from 'containers/app-router/app-router';

const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default App;
