import { useEffect } from "react";
import { useState } from "react";
import checkMark from "./chekMark.svg";
import crossMark from "./crossMark.svg";
import {
  URL_POSTERS,
  DEFAULT_PAGE,
  DEFAULT_YEAR,
} from "../../../../../../GlobalConstants";
import { useTranslation } from "react-i18next";
import {
  GetDataMovies,
  GetInfoFilmById,
} from "../../../../../../services/GetData";
import { FC } from "react";
import {
  StyledFIlmItemElement,
  CheckAndCrossImg,
  StyledLocationFromViews,
  StyledFIlmItem,
  CheckStyle,
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
  const { t, i18n } = useTranslation();
  let [informationAboutFilms, setInformationAboutFilms] = useState<any[]>([]);
  const [filmsIds, setfilmsIds] = useState<number[]>(
    JSON.parse(localStorage["filmsIds"])
  );

  useEffect(() => {
    setInformationAboutFilms([]);
    filmsIds.map((ari) => {
      GetInfoFilmById(ari).then((res) => {
        setInformationAboutFilms((prev) =>
          prev.concat({ ...res, ...{ viewedFilm: false } })
        );
      });
    });
  }, []);

  const handleView = (index: number): void => {
    informationAboutFilms[index].viewedFilm =
      !informationAboutFilms[index].viewedFilm;
    setInformationAboutFilms([...informationAboutFilms]);
  };

  const deleteView = (idfilm: number): void => {
    setInformationAboutFilms(
      informationAboutFilms.filter((film) => film.id !== idfilm)
    );
  };

  useEffect(() => {
    let newFilmsIds = informationAboutFilms.map((film) => film.id);
    localStorage.setItem("filmsIds", JSON.stringify(newFilmsIds));
    setfilmsIds(newFilmsIds);
  }, [informationAboutFilms]);

  return (
    <div>
      <h4> {t("addFilmPage.youFavMovies")} </h4>
      <StyledLocationFromViews viewPage={view}>
        {informationAboutFilms.map((film, index) => {
          return (
            <div>
              <StyledFIlmItem viewPage={view}>
                <StyledFIlmItemElement>{index}</StyledFIlmItemElement>
                <CheckStyle checked={film.viewedFilm}>{film.title}</CheckStyle>
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
                  <img src={crossMark} onClick={() => deleteView(film.id)} />
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
