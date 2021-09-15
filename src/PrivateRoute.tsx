import React, { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  const isAuth = true;
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/login"} />)}
    />
  );
};
export default PrivateRoute;
