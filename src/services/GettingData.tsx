import axios from "axios";
import React from "react";
import { useState } from "react";

interface Ifillters {}

const URL_2 = `https://api.themoviedb.org/3/discover/movie`;
const URL_MOVIES_ADD = `${URL_2}?api_key=`;

//const URL = `${URL_MOVIES_ADD}${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
export const GettingData = async (
  year: number,
  language: string,
  page: number
): Promise<Array<Object>> => {
  const res = await axios.get(
    `${URL_MOVIES_ADD}${process.env.REACT_APP_API}&language=${language}-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_watch_monetization_types=flatrate`
  );
  // .then((res) => {
  //   console.log("qq", res.data.results);
  //   return res.data.results;
  // });
  console.log("yy", res.data.results);
  return res.data.results;
};
