import React from "react";
import { CheckFilm } from "../../styled";
const CheckingFilm = ({ checkingMark, title }: any): any => {
  return (
    <CheckFilm checkingMark={checkingMark}>
      <p>{title}</p>
    </CheckFilm>
  );
};
export default CheckingFilm;
