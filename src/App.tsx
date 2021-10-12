import { Route, Router, Switch } from "react-router-dom";
import Authorization from "./components/Authorization";
import MainPage from "./components/GenresAddFilmAndMainPage/components/MainPages";
import { GlobalStyle } from "./GlobalStyle";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./components/Authorization/context";
import { useEffect, useState } from "react";
import { FillAuthData } from "./services/FillandisValidateData";
import AddFilm from "./components/GenresAddFilmAndMainPage/components/AddFilm/index";
import { GenresAddFilmAndMainPage } from "./components/GenresAddFilmAndMainPage/index";
const App: React.FC = () => {
  FillAuthData();

  const [isLogged, setisLogged] = useState(false);
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <AuthContext.Provider value={isLogged}>
          <PrivateRoute exact path={["/", "/add"]}>
            <GenresAddFilmAndMainPage />
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
