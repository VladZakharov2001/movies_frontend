import { useEffect } from "react";
import axios from "axios";
import { FC } from "react";
import { useState } from "react";
import {
  URL_POSTERS,
  DEFAULT_YEAR,
  DEFAULT_PAGE,
} from "../../../../../../GlobalConstants";
import { useTranslation } from "react-i18next";
import { GetDataMovies } from "../../../../../../services/GetData";
import { Button } from "@material-ui/core";
import {
  StyledLocationFromViews,
  StyledFIlmItem,
  StyledFIlmItemElement,
} from "../../../../../../components/GenresAddFilmAndMainPage/styled";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
  range: string;
  currentDate: string;
  view: boolean;
}
const BlockOrRowViewAdd: FC<IProps> = ({
  genresId,
  langFlag,
  range,
  currentDate,
  view,
}): JSX.Element => {
  const [films, setFilms] = useState<any[]>(
    JSON.parse(localStorage["films"]) || []
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    GetDataMovies(
      Number(currentDate),
      langFlag,
      DEFAULT_PAGE,
      genresId,
      Number(range)
    ).then((res) => {
      if (JSON.parse(localStorage["films"]).length === 0) {
        localStorage.setItem("films", JSON.stringify(res));
      }

      let array: Array<Object> = JSON.parse(localStorage["saveFilmsAdd"])
        .map((savedFilm: any) => {
          return savedFilm.id;
        })
        .concat();

      setFilms(
        res.map((film: any) => {
          if (array.includes(film.id)) {
            film.disable = true;
          }
          return film;
        })
      );
    });
  }, [currentDate, range, genresId]);

  useEffect(() => {
    localStorage.setItem(
      "saveFilmsAdd",
      JSON.stringify(
        films.filter((film) => {
          return film.disable;
        })
      )
    );
  }, [films]);

  const saveFilm = (id: number): void => {
    setFilms(
      films.map((film) => {
        if (film.id == id) {
          film.disable = true;
        }
        return film;
      })
    );
    localStorage.setItem("films", JSON.stringify(films));
  };

  return (
    <div>
      <StyledLocationFromViews viewPage={view}>
        {films &&
          films.map((film, index) => {
            return (
              <div>
                <StyledFIlmItem viewPage={view}>
                  <StyledFIlmItemElement>{index}</StyledFIlmItemElement>
                  <StyledFIlmItemElement>{film.title}</StyledFIlmItemElement>
                  <StyledFIlmItemElement>
                    <img src={`${URL_POSTERS}${film.backdrop_path}`} />
                  </StyledFIlmItemElement>
                  <StyledFIlmItemElement>
                    {t("addFilmPage.popularity")} {film.popularity}
                  </StyledFIlmItemElement>
                  <StyledFIlmItemElement>
                    {t("addFilmPage.releaseDate")} {film.release_date}
                  </StyledFIlmItemElement>
                  <StyledFIlmItemElement>{film.id}</StyledFIlmItemElement>
                  <StyledFIlmItemElement>
                    <Button
                      color={film.disable ? "primary" : "secondary"}
                      onClick={() => saveFilm(film.id)}
                    >
                      {t("addFilmPage.save")}
                    </Button>
                  </StyledFIlmItemElement>
                </StyledFIlmItem>
              </div>
            );
          })}
      </StyledLocationFromViews>
    </div>
  );
};
export default BlockOrRowViewAdd;
