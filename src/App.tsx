import { Route, Router, Switch } from "react-router-dom";
import Authorization from "./components/Authorization";
import MainPage from "./components/MainPages";
import { GlobalStyle } from "./GlobalStyle";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./components/Authorization/context";
import { useEffect, useState } from "react";
import { FillAuthData } from "./services/FillandisValidateData";
import AddFilm from "./components/AddFilm/index";
const App: React.FC = () => {
  FillAuthData();

  const [isLogged, setisLogged] = useState(false);
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <AuthContext.Provider value={isLogged}>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <PrivateRoute exact path="/add">
            <AddFilm />
          </PrivateRoute>
          <Route exact path="/login">
            <Authorization isLogged={setisLogged} />
          </Route>
        </AuthContext.Provider>
      </Switch>
    </div>
  );
};
export default App;
