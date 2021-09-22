import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { URL_API } from "./constants";
import RowFavMovies from "./components/RowFavMovies/index";
import BlockFavMovies from "./components/BlockFavMovies/index";
const MainPage = (props: any) => {
  const [ganres, setGanres] = useState<any[]>([]);
  const [ganresObj, setGanresObj] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [favoriteGanres, setFavoriteGanres] = useState();
  const [activeWiew, setActivWiew] = useState();

  const URL = `${URL_API}${process.env.REACT_APP_API}&language=en-US`;
  useEffect(() => {
    axios.get(URL).then((res) => {
      setGanres(
        res.data.genres.map((ganres: any, index: number) => ({
          id: index,
          watched: false,
          name: ganres.name,
        }))
      );
      console.log(res.data.genres);
    });
  }, []);

  console.log("ll", ganres);
  localStorage.setItem("ganres", JSON.stringify(ganres));
  const deleteSession = (): void => {
    localStorage.removeItem("сurrentLogin");
    console.log("delete");
  };

  const handleCheck = (index: any): void => {
    ganres[index].watched = !ganres[index].watched;
    console.log(ganres[index].watched);
    setGanres([...ganres]);
  };
  const handleAlignment = () => {};
  return (
    <div>
      <div>
        Hello,
        {localStorage.getItem("сurrentLogin") !== null
          ? localStorage.getItem("сurrentLogin")
          : ""}
        <Link onClick={deleteSession} to="/login">
          Log out
        </Link>
      </div>
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
      <h4>You favorite movies</h4>
      <div>
        <NavLink to="/add">
          <Button variant="outlined">ADD</Button>
        </NavLink>
      </div>
      <Button variant="outlined">С</Button>
      <Button variant="outlined">Б</Button>
      <RowFavMovies />
      <BlockFavMovies />
    </div>
  );
};
export default MainPage;
