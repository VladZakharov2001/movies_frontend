import { Route, Router, Switch } from "react-router-dom";
import Authorization from "./components/Authorization";
import MainPage from "./components/MainPages";
import GlobalStyle from "./GlobalStyle";
import PrivateRoute from "./PrivateRoute";
import { FillAuthData } from "./services/FillAuthData";
import { AuthContext } from "./components/Authorization/context";
import { useEffect, useState } from "react";
const App: React.FC = () => {
  FillAuthData();

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
