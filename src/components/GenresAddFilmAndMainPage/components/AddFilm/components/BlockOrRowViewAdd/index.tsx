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
  const [films, setFilms] = useState<any[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    GetDataMovies(
      Number(currentDate),
      langFlag,
      DEFAULT_PAGE,
      genresId,
      Number(range)
    ).then((res) => {
      setFilms(
        res.map((film: Object) => ({
          ...film,
          check: false,
        }))
      );
    });
  }, [genresId, currentDate, range]);

  const saveFilm = (index: number): void => {
    films[index].check = !films[index].check;
    setFilms([...films]);
  };

  localStorage.setItem("films", JSON.stringify(films));

  return (
    <div>
      <StyledLocationFromViews viewPage={view}>
        {films.map((film, index) => {
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
                <StyledFIlmItemElement>
                  <Button
                    color={film.check ? "primary" : "secondary"}
                    onClick={() => saveFilm(index)}
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
