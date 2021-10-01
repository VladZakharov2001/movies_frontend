import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ViewFilms } from "../../../AddFilm/styled";
import checkMark from "./chekMark.svg";
import crossMark from "./crossMark.svg";
import { CheckFilm } from "./styled";
import { URL_MOVIES, URL_POSTERS } from "./constants";
import CheckingFilm from "./components/CheckingFilm";
const RowFavMovies = (): any => {
  const [films, setFilms] = useState<any[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `${URL_MOVIES}${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        setFilms(
          res.data.results.map((film: any) => ({
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
      <h4>You favorite movies</h4>
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
                <p>Популярность{film.popularity}</p>
                <p>Дата релиза{film.release_date}</p>
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
export default RowFavMovies;
