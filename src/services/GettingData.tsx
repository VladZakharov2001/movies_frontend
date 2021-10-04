import axios from "axios";
import { URL_GENRES, URL_MOVIES } from "../GlobalConstants";

interface Ganre {
  id: number;
  name: string;
}

export const GettingData = async (
  year: number,
  language: string,
  page: number
): Promise<Array<Object>> => {
  const res = await axios.get(
    `${URL_MOVIES}?api_key=${process.env.REACT_APP_API}&language=${language}-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_watch_monetization_types=flatrate`
  );
  return res.data.results;
};

export const GettingGanres = async (
  language: string
): Promise<Array<Ganre>> => {
  const res = await axios.get(
    `${URL_GENRES}?api_key=${process.env.REACT_APP_API}&language=${language}-${language}`
  );
  return res.data.genres;
};
