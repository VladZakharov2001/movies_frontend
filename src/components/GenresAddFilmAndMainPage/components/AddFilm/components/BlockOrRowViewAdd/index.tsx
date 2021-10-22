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
import {
  GetDataMovies,
  GetInfoFilmById,
} from "../../../../../../services/GetData";
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
  const [films, setFilms] = useState<any[]>(JSON.parse(localStorage["films"]));

  const [filmsId, setFilmsId] = useState<number[]>(
    JSON.parse(localStorage["filmsId"])
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
      setFilms(res);
    });
  }, [currentDate, range, genresId]);

  localStorage.setItem("filmsId", JSON.stringify(filmsId));

  const saveFilm = (id: number): void => {
    setFilmsId([...filmsId, id]);
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
                      color={
                        filmsId.includes(film.id) ? "primary" : "secondary"
                      }
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
