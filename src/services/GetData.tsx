import axios from "axios";
import { URL_GENRES, URL_MOVIES } from "../GlobalConstants";

interface IGenre {
  id: number;
  name: string;
}

export const GetDataMovies = async (
  year: number,
  language: string,
  page: number,
  genresId: Array<number>,
  range: number
): Promise<Array<Object>> => {
  const res = await axios.get(
    `${URL_MOVIES}?api_key=${
      process.env.REACT_APP_API
    }&language=${language}-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresId.join()}&year=${year}&with_watch_monetization_types=flatrate&vote_average.lte=${range}`
  );
  console.log(year);
  return res.data.results;
};

export const GetDataGenres = async (
  language: string
): Promise<Array<IGenre>> => {
  const res = await axios.get(
    `${URL_GENRES}?api_key=${process.env.REACT_APP_API}&language=${language}-${language}`
  );
  return res.data.genres;
};
