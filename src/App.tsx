import { Route, Router, Switch } from "react-router-dom";
import Authorization from "./components/Authorization";
import MainPage from "./components/MainPages";
import GlobalStyle from "./GlobalStyle";
import PrivateRoute from "./PrivateRoute";
import user from "../src/components/Authorization/constants";
import { AuthContext } from "./components/Authorization/context";
import { useEffect, useState } from "react";
const App: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("login") !== "null") {
      localStorage.setItem("login", user.USER_LOGIN[0]);
    }
    if (localStorage.getItem("password") !== "null") {
      localStorage.setItem("password", user.USER_PASSWORD[0]);
    }
  }, []);
  const [valueAuth, setValueAuth] = useState(false);
  const getValueAuth = (value: boolean): boolean => {
    setValueAuth(value);
    return value;
  };
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <AuthContext.Provider value={valueAuth}>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <Route exact path="/login">
            <Authorization getValueAuth={getValueAuth} />
          </Route>
        </AuthContext.Provider>
      </Switch>
    </div>
  );
};
export default App;
