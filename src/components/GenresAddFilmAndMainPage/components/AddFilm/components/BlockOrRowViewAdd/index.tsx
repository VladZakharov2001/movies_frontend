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
  range: number;
  currentDate: number;
  view: boolean;
}

const BlockOrRowViewAdd: FC<IProps> = ({
  genresId,
  langFlag,
  range,
  currentDate,
  view,
}): JSX.Element => {
  const [informationAboutFilms, setInformationAboutFilms] = useState<any[]>([]);
  const [filmsIds, setfilmsIds] = useState<number[]>(
    JSON.parse(localStorage["filmsIds"])
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    GetDataMovies(currentDate, langFlag, DEFAULT_PAGE, genresId, range).then(
      (res) => {
        setInformationAboutFilms(res);
      }
    );
  }, [currentDate, range, genresId]);

  const saveFilm = (id: number): void => {
    let newfilmsIds = [...filmsIds, id];
    setfilmsIds(newfilmsIds);
    localStorage.setItem("filmsIds", JSON.stringify(newfilmsIds));
  };

  return (
    <div>
      <StyledLocationFromViews viewPage={view}>
        {informationAboutFilms &&
          informationAboutFilms.map((film, index) => {
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
                        filmsIds.includes(film.id) ? "primary" : "secondary"
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
