import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/masuk" replace />;
  }

  return element;
};

export default PrivateRoute;
