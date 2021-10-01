import { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { ViewFilms } from "./styled";
import { URL_MOVIES_ADD } from "./constants";
import { GettingData } from "../../services/GettingData";
const AddFilm = () => {
  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    GettingData(2021, "ru", 1).then((res) => {
      setFilms(res);
    });
  }, []);

  return (
    <div>
      <div>Choose your destiny</div>
      {films.map((film, index) => {
        return (
          <div>
            <span>
              <ViewFilms>
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
              </ViewFilms>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default AddFilm;
