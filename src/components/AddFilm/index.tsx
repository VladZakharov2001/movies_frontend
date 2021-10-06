import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { GetDataGenres } from "../../services/GetData";
import { useTranslation } from "react-i18next";
import BlockOrRowViewAdd from "./components/BlockOrRowViewAdd";

const AddFilm = () => {
  const { t, i18n } = useTranslation();
  const [langFlag, setLangFlag] = useState<string>("en");
  const [genresId, setGenresId] = useState<number[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

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

  useEffect(() => {
    setGenresId(
      genres
        .filter((w, index) => {
          return genres[index].watched === true;
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
      <div> {t("addFilmPage.chooseYD")}</div>
      <BlockOrRowViewAdd genresId={genresId} langFlag={langFlag} />
    </div>
  );
};
export default AddFilm;
