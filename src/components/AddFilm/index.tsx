import { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const AddFilm: React.FC = () => {
  const URLMOVIES =
    "https://api.themoviedb.org/3/discover/movie?api_key=9ab8bf7eac8227309d7ec67bab0298b3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const [films, setFilms] = useState<any[]>([]);
  useEffect(() => {
    axios.get(URLMOVIES).then((res) => {
      console.log("m", res.data);
    });
  }, []);

  return (
    <div>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>
  );
};
export default AddFilm;
