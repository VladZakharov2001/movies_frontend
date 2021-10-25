import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { GetDataGenres } from "../../services/GetData";
import { useTranslation } from "react-i18next";
import PrivateRoute from "../../PrivateRoute";
import MainPage from "./components/MainPages/index";
import AddFilm from "./components/AddFilm/index";
import View from "../GenresAddFilmAndMainPage/components/View/index";
import { isValidFilmsIdAndFilms } from "../../services/FillandisValidateData";
export const GenresAddFilmAndMainPage = () => {
  const { t, i18n } = useTranslation();
  const [langFlag, setLangFlag] = useState<string>("en");
  const [genresId, setGenresId] = useState<number[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [view, setView] = useState<boolean>(false);
  const getGenres = (lang: string): void => {
    GetDataGenres(lang).then((res) => {
      setGenres(
        res.map((genres, index) => ({
          id: genres.id,
          watched: false,
          name: genres.name,
        }))
      );
    });
  };

  isValidFilmsIdAndFilms();
  useEffect(() => {
    setGenresId(
      genres
        .filter((w, index) => {
          return genres[index].watched;
        })
        .map((genreInfo) => {
          return genreInfo.id;
        })
    );
  }, [genres]);

  useEffect(() => {
    getGenres("en");
  }, []);

  useEffect(() => {
    getGenres(langFlag);
  }, [langFlag]);

  const changeLanguage = (lang: string): void => {
    setLangFlag(lang);
    i18n.changeLanguage(lang);
  };

  const handleCheck = (index: number): void => {
    genres[index].watched = !genres[index].watched;
    setGenres([...genres]);
  };

  localStorage.setItem("genres", JSON.stringify(genres));

  return (
    <div>
      <Button variant="outlined" onClick={() => changeLanguage("ru")}>
        ru
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage("en")}>
        en
      </Button>
      <View viewB={view} onClick={() => setView(false)} symbolView={"Б"} />
      <View viewB={!view} onClick={() => setView(true)} symbolView={"С"} />
      {genres &&
        genres.map((genres, index) => (
          <Button
            variant="outlined"
            onClick={() => {
              handleCheck(index);
            }}
            color={genres.watched ? "primary" : "secondary"}
          >
            {genres.name}
          </Button>
        ))}
      <PrivateRoute exact path="/">
        <MainPage genresId={genresId} langFlag={langFlag} view={view} />
      </PrivateRoute>
      <PrivateRoute exact path="/add">
        <AddFilm genresId={genresId} langFlag={langFlag} view={view} />
      </PrivateRoute>
    </div>
  );
};
