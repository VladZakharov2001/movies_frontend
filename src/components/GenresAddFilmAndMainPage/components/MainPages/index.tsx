import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import RowOrBlockViewFavMovies from "./components/RowOrBlockViewFavMovies/index";
import View from "./components/View/index";
import SessionCheck from "./components/SessionCheck/index";
import { useTranslation } from "react-i18next";
import { FC } from "react";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
}
const MainPage: FC<IProps> = ({ genresId, langFlag }): JSX.Element => {
  const [view, setView] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <SessionCheck />
      <NavLink to="/add">
        <Button variant="outlined">{t("addFilmPage.add")}</Button>
      </NavLink>
      <View viewB={view} onClick={() => setView(false)} symbolView={"Б"} />
      <View viewB={!view} onClick={() => setView(true)} symbolView={"С"} />
      <RowOrBlockViewFavMovies
        genresId={genresId}
        langFlag={langFlag}
        view={view}
      />
    </div>
  );
};
export default MainPage;
