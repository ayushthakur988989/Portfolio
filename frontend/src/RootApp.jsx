import React from 'react';
import App from './App';
import AuthPortal from './components/AuthPortal';

const RootApp = () => {
  const route = window.location.pathname.replace(/\/$/, '') || '/';
  const isAuthRoute = route === '/login' || route === '/register' || route.startsWith('/dashboard/');

  return isAuthRoute ? <AuthPortal route={route} /> : <App />;
};

export default RootApp;
