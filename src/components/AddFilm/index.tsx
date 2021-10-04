import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { ViewFilms } from "./styled";
import { FILM_IMG } from "./constants";
import { GettingData } from "../../services/GettingData";
import { useTranslation } from "react-i18next";

const AddFilm = () => {
  const [films, setFilms] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const [langFlag, setLangFlag] = useState<string>("en");

  const changeLanguage = (lang: string): void => {
    setLangFlag(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    GettingData(2021, langFlag, 1).then((res) => {
      setFilms(res);
    });
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={() => changeLanguage("ru")}>
        ru
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage("en")}>
        en
      </Button>
      <div> {t("addFilmPage.chooseYD")}</div>
      {films.map((film, index) => {
        return (
          <div>
            <span>
              <ViewFilms>
                <p>{index}</p>
                <p>{film.original_title}</p>
                <img src={`${FILM_IMG}${film.backdrop_path}`} />
                <p>
                  {t("addFilmPage.popularity")} {film.popularity}
                </p>
                <p>
                  {t("addFilmPage.releaseDate")} {film.release_date}
                </p>
                <div>
                  <Button>{t("addFilmPage.save")}</Button>
                </div>
              </ViewFilms>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default AddFilm;
