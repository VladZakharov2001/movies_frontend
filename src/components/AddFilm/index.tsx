import { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { WiewFilms } from "./styled";
import { URL_MOVIES_ADD } from "./constants";
const AddFilm: React.FC = () => {
  const URLMOVIES = `${URL_MOVIES_ADD}${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    axios.get(URLMOVIES).then((res) => {
      setFilms([...res.data.results]);
    });
  }, []);
  return (
    <div>
      <div>Choose your destiny</div>
      {films.map((film, index) => {
        return (
          <div>
            <span>
              <WiewFilms>
                <p>{index}</p>
                <p>{film.original_title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${film.backdrop_path}`}
                />
                <p>Популярность{film.popularity}</p>
                <p>Дата релиза{film.release_date}</p>
                <div>
                  <Button>Save it</Button>
                </div>
              </WiewFilms>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default AddFilm;
