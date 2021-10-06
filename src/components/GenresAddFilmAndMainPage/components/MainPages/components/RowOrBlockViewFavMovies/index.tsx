import { useEffect } from "react";
import { useState } from "react";
import { ViewFilms } from "../../../AddFilm/styled";
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

interface IProps {
  langFlag: string;
  genresId: Array<number>;
}

const RowOrBlockViewFavMovies: FC<IProps> = ({
  genresId,
  langFlag,
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
      {films.map((film, index) => {
        return (
          <div>
            <span>
              <ViewFilms>
                <p>{index}</p>
                <CheckingFilm
                  checkingMark={films[index].check}
                  title={film.original_title}
                />
                <img src={`${URL_POSTERS}${film.backdrop_path}`} />
                <p>
                  {t("addFilmPage.popularity")} {film.popularity}
                </p>
                <p>
                  {t("addFilmPage.releaseDate")} {film.release_date}
                </p>
                <div>
                  <img src={checkMark} onClick={() => handleView(index)} />
                  <img src={crossMark} onClick={() => deleteView(index)} />
                </div>
              </ViewFilms>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default RowOrBlockViewFavMovies;
