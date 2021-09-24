import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { URL_API } from "./constants";
import RowFavMovies from "./components/RowFavMovies/index";
import BlockFavMovies from "./components/BlockFavMovies/index";
import View from "../MainPages/components/View/index";
import SessionCheck from "./components/SessionCheck/index";
const MainPage = (props: any) => {
  const [ganres, setGanres] = useState<any[]>([]);
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${URL_API}${process.env.REACT_APP_API}&language=en-US`)
      .then((res) => {
        setGanres(
          res.data.genres.map((ganres: any, index: number) => ({
            id: index,
            watched: false,
            name: ganres.name,
          }))
        );
      });
  }, []);

  localStorage.setItem("ganres", JSON.stringify(ganres));
  const handleCheck = (index: any): void => {
    ganres[index].watched = !ganres[index].watched;
    setGanres([...ganres]);
  };

  return (
    <div>
      <SessionCheck />
      <div>
        <h3>Select you favorite genres</h3>
        {ganres &&
          ganres.map((ganres, index) => (
            <Button
              variant="outlined"
              onClick={() => {
                handleCheck(index);
              }}
              color={ganres.watched ? "primary" : "success"}
            >
              {ganres.name}
            </Button>
          ))}
      </div>
      <NavLink to="/add">
        <Button variant="outlined">ADD</Button>
      </NavLink>
      <View viewB={view} onClick={() => setView(false)} symbolb={"C"} />
      <View viewB={!view} onClick={() => setView(true)} symbolb={"Б"} />
      {view ? <BlockFavMovies /> : <RowFavMovies />}
    </div>
  );
};
export default MainPage;
