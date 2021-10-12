import { useEffect } from "react";
import axios from "axios";
import { FC } from "react";
import { useState } from "react";
import { ViewFilms } from "../../styled";
import {
  URL_POSTERS,
  DEFAULT_YEAR,
  DEFAULT_PAGE,
} from "../../../../../../GlobalConstants";
import { useTranslation } from "react-i18next";
import { GetDataMovies } from "../../../../../../services/GetData";
import { Button } from "@material-ui/core";

interface IProps {
  genresId: Array<number>;
  langFlag: string;
}
const BlockOrRowViewAdd: FC<IProps> = ({ genresId, langFlag }): JSX.Element => {
  const [films, setFilms] = useState<any[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    GetDataMovies(DEFAULT_YEAR, langFlag, DEFAULT_PAGE, genresId).then(
      (res) => {
        setFilms(
          res.map((film: Object) => ({
            ...film,
            check: false,
          }))
        );
      }
    );
  }, [genresId]);

  localStorage.setItem("films", JSON.stringify(films));

  return (
    <div>
      {films.map((film, index) => {
        return (
          <div>
            <span>
              <ViewFilms>
                <p>{index}</p>
                <p>{film.title}</p>
                <img src={`${URL_POSTERS}${film.backdrop_path}`} />
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
export default BlockOrRowViewAdd;
