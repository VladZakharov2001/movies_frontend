import { useEffect } from "react";
import { useState } from "react";
import checkMark from "./chekMark.svg";
import crossMark from "./crossMark.svg";
import {
  URL_POSTERS,
  DEFAULT_PAGE,
  DEFAULT_YEAR,
} from "../../../../../../GlobalConstants";
import CheckingFilm from "./components/CheckingFilm";
import { useTranslation } from "react-i18next";
import { GetDataMovies } from "../../../../../../services/GetData";
import { FC } from "react";
import {
  StyledFIlmItemElement,
  CheckAndCrossImg,
  StyledLocationFromViews,
  StyledFIlmItem,
} from "../../../../styled";
interface IProps {
  langFlag: string;
  genresId: Array<number>;
  view: boolean;
}

const RowOrBlockViewFavMovies: FC<IProps> = ({
  genresId,
  langFlag,
  view,
}): JSX.Element => {
  const [films, setFilms] = useState<any[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    GetDataMovies(2021, langFlag, 1, genresId).then((res) => {
      setFilms(
        res.map((film: Object) => ({
          ...film,
          check: false,
        }))
      );
    });
  }, []);

  const handleView = (index: number): void => {
    films[index].check = !films[index].check;
    setFilms([...films]);
  };

  const deleteView = (index: number): void => {
    films.splice(index, 1);
    setFilms([...films]);
  };

  return (
    <div>
      <h4> {t("addFilmPage.youFavMovies")} </h4>
      <StyledLocationFromViews viewPage={view}>
        {films.map((film, index) => {
          return (
            <div>
              <StyledFIlmItem viewPage={view}>
                <StyledFIlmItemElement>{index}</StyledFIlmItemElement>
                <CheckingFilm
                  checkingMark={films[index].check}
                  title={film.original_title}
                />
                <StyledFIlmItemElement>
                  <img src={`${URL_POSTERS}${film.backdrop_path}`} />
                </StyledFIlmItemElement>
                <StyledFIlmItemElement>
                  {t("addFilmPage.popularity")} {film.popularity}
                </StyledFIlmItemElement>
                <StyledFIlmItemElement>
                  {t("addFilmPage.releaseDate")} {film.release_date}
                </StyledFIlmItemElement>
                <CheckAndCrossImg>
                  <img src={checkMark} onClick={() => handleView(index)} />
                  <img src={crossMark} onClick={() => deleteView(index)} />
                </CheckAndCrossImg>
              </StyledFIlmItem>
            </div>
          );
        })}
      </StyledLocationFromViews>
    </div>
  );
};
export default RowOrBlockViewFavMovies;
