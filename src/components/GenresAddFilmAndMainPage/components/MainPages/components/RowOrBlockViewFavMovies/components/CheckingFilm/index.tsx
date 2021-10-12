import React, { FC } from "react";
import { CheckFilm } from "../../styled";
interface IProps {
  checkingMark: boolean;
  title: string;
}
const checkingFilm: FC<IProps> = ({ checkingMark, title }): JSX.Element => {
  return (
    <CheckFilm checkingMark={checkingMark}>
      <p>{title}</p>
    </CheckFilm>
  );
};
export default checkingFilm;
