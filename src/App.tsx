import { Route, Router, Switch } from "react-router-dom";
import Authorization from "./components/Authorization";
import MainPage from "./components/MainPages";
import GlobalStyle from "./GlobalStyle";
import PrivateRoute from "./PrivateRoute";
import user from "../src/components/Authorization/constants";
const App: React.FC = () => {
  if (localStorage.getItem("login") !== "null") {
    localStorage.setItem("login", user.USER_LOGIN[0]);
  }
  if (localStorage.getItem("password") !== "null") {
    localStorage.setItem("password", user.USER_PASSWORD[0]);
  }

  return (
    <div>
      <GlobalStyle />
      <Switch>
        <PrivateRoute exact path="/">
          <MainPage />
        </PrivateRoute>
        <Route exact path="/login">
          <Authorization />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
