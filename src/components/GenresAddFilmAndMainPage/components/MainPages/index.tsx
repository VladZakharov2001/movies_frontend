import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import RowOrBlockViewFavMovies from "./components/RowOrBlockViewFavMovies/index";
import View from "../View/index";
import SessionCheck from "./components/SessionCheck/index";
import { useTranslation } from "react-i18next";
import { FC } from "react";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
  view: boolean;
}
const MainPage: FC<IProps> = ({ genresId, langFlag, view }): JSX.Element => {
  // const [view, setView] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <SessionCheck />
      <NavLink to="/add">
        <Button variant="outlined">{t("addFilmPage.add")}</Button>
      </NavLink>
      <RowOrBlockViewFavMovies
        genresId={genresId}
        langFlag={langFlag}
        view={view}
      />
    </div>
  );
};
export default MainPage;
