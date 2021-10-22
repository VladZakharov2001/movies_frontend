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
  let [filmsI, setFilmsI] = useState<any[]>([]);
  const [viewedFilmsId, setViewedFilmsId] = useState<number[]>([]);
  const [filmsId, setFilmsId] = useState<number[]>(
    JSON.parse(localStorage["filmsId"])
  );

  useEffect(() => {
    setFilmsI([]);
    filmsId.map((ari) => {
      GetInfoFilmById(ari).then((res) => {
        setFilmsI((prev) => prev.concat({ ...res, ...{ viewedFilm: false } }));
      });
    });
  }, []);

  const handleView = (index: number): void => {
    filmsI[index].viewedFilm = !filmsI[index].viewedFilm;
    setFilmsI([...filmsI]);
  };

  const deleteView = (idfilm: number): void => {
    setFilmsI(filmsI.filter((film) => film.id !== idfilm));
  };

  useEffect(() => {
    setFilmsId(filmsI.map((film) => film.id));
  }, [filmsI]);

  localStorage.setItem("filmsId", JSON.stringify(filmsId));

  return (
    <div>
      <h4> {t("addFilmPage.youFavMovies")} </h4>
      <StyledLocationFromViews viewPage={view}>
        {filmsI.map((film, index) => {
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
