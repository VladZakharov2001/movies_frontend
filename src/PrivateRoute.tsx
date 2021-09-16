import React, { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./components/Authorization/context";
import { useContext } from "react";
const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  const isAuth = useContext(AuthContext);
  console.log("kk", isAuth);
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/login"} />)}
    />
  );
};
export default PrivateRoute;
