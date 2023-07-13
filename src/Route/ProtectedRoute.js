import { React } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../Utils/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  console.log(token);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token !== null) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
