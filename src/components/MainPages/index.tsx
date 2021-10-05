import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import RowOrBlockViewFavMovies from "./components/RowOrBlockViewFavMovies/index";
import View from "../MainPages/components/View/index";
import SessionCheck from "./components/SessionCheck/index";
import { GetDataGenres } from "../../services/GetData";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const [genres, setgenres] = useState<any[]>([]);
  const [view, setView] = useState<boolean>(false);
  const [langFlag, setLangFlag] = useState<string>("en");
  const { t, i18n } = useTranslation();

  const getGenres = (lang: string): void => {
    GetDataGenres(lang).then((res) => {
      setgenres(
        res.map((genres, index) => ({
          id: genres.id,
          watched: false,
          name: genres.name,
        }))
      );
    });
  };

  useEffect(() => {
    getGenres("ru");
  }, []);

  useEffect(() => {
    langFlag === "ru" ? getGenres("ru") : getGenres("en");
  }, [langFlag]);

  const changeLanguage = (lang: string): void => {
    setLangFlag(lang);
    i18n.changeLanguage(lang);
  };

  const handleCheck = (index: number): void => {
    genres[index].watched = !genres[index].watched;
    setgenres([...genres]);
  };

  localStorage.setItem("genres", JSON.stringify(genres));

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
        {genres &&
          genres.map((genres, index) => (
            <Button
              variant="outlined"
              onClick={() => {
                handleCheck(index);
              }}
              color={genres.watched ? "primary" : "success"}
            >
              {genres.name}
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
