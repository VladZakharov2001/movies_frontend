import React, { FC } from "react";
import {
  StyledCheckFilm,
  StyledFIlmItemElement,
} from "../../../../../../styled";
interface IProps {
  checkingMark: boolean;
  title: string;
}
const checkingFilm: FC<IProps> = ({ checkingMark, title }): JSX.Element => {
  return (
    <StyledCheckFilm checkingMark={checkingMark}>
      <p>
        <StyledFIlmItemElement>{title}</StyledFIlmItemElement>
      </p>
    </StyledCheckFilm>
  );
};
export default checkingFilm;
