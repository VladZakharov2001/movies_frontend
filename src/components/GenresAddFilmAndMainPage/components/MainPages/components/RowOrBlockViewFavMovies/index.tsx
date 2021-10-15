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
  const [checkedMark, setcheckedMark] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setFilms(
      JSON.parse(localStorage["films"] || null).map((film: Object) => ({
        ...film,
        checkedMark: false,
      }))
    );
  }, []);

  const handleView = (index: number): void => {
    films[index].checkedMark = !films[index].checkedMark;
    setFilms([...films]);
  };

  const deleteView = (index: number, idfilm: number): void => {
    for (let i = 0; i < films.length; i++) {
      if (films[i].id == idfilm) {
        films[i].check = !films[i].check;
      }
      setFilms([...films]);
    }
  };
  if (films.length != 0) localStorage.setItem("films", JSON.stringify(films));

  return (
    <div>
      <h4> {t("addFilmPage.youFavMovies")} </h4>
      <StyledLocationFromViews viewPage={view}>
        {films.filter((film) => film.check === true).length == 0 && (
          <div>Фильмов нет</div>
        )}
        {films
          .filter((film) => film.check === true)
          .map((film, index) => {
            return (
              <div>
                <StyledFIlmItem viewPage={view}>
                  <StyledFIlmItemElement>{index}</StyledFIlmItemElement>
                  <CheckingFilm
                    checkingMark={films[index].checkedMark}
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
                  <StyledFIlmItemElement>{film.id}</StyledFIlmItemElement>
                  <CheckAndCrossImg>
                    <img src={checkMark} onClick={() => handleView(index)} />
                    <img
                      src={crossMark}
                      onClick={() => deleteView(index, film.id)}
                    />
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
