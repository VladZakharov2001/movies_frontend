import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import RowOrBlockViewFavMovies from "./components/RowOrBlockViewFavMovies/index";
import View from "../MainPages/components/View/index";
import SessionCheck from "./components/SessionCheck/index";
import { GettingGanres } from "../../services/GettingData";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const [ganres, setGanres] = useState<any[]>([]);
  const [view, setView] = useState<boolean>(false);
  const [langFlag, setLangFlag] = useState<string>("en");
  const { t, i18n } = useTranslation();

  const getGenres = (lang: string): void => {
    GettingGanres(lang).then((res) => {
      setGanres(
        res.map((ganres, index) => ({
          id: index,
          watched: false,
          name: ganres.name,
        }))
      );
    });
  };

  useEffect(() => {
    getGenres("ru");
  }, []);

  localStorage.setItem("ganres", JSON.stringify(ganres));

  useEffect(() => {
    langFlag === "ru" ? getGenres("ru") : getGenres("en");
  }, [langFlag]);

  const changeLanguage = (lang: string): void => {
    setLangFlag(lang);
    i18n.changeLanguage(lang);
  };

  const handleCheck = (index: number): void => {
    ganres[index].watched = !ganres[index].watched;
    setGanres([...ganres]);
  };

  return (
    <div>
      <SessionCheck />
      <div>
        <Button variant="outlined" onClick={() => changeLanguage("ru")}>
          ru
        </Button>
        <Button variant="outlined" onClick={() => changeLanguage("en")}>
          en
        </Button>
        <h3>{t("mainPage.selectYouFavGenres")}</h3>
        {ganres &&
          ganres.map((ganres, index) => (
            <Button
              variant="outlined"
              onClick={() => {
                handleCheck(index);
              }}
              color={ganres.watched ? "primary" : "success"}
            >
              {ganres.name}
            </Button>
          ))}
      </div>
      <NavLink to="/add">
        <Button variant="outlined">{t("addFilmPage.add")}</Button>
      </NavLink>
      <View viewB={view} onClick={() => setView(false)} symbolView={"Б"} />
      <View viewB={!view} onClick={() => setView(true)} symbolView={"С"} />
      {view ? <RowOrBlockViewFavMovies /> : <div>Блочный</div>}
    </div>
  );
};
export default MainPage;
