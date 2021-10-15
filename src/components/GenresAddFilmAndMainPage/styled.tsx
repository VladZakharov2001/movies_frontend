import styled from "styled-components";
interface IProps {
  viewPage: boolean;
}
export const StyledCheckFilm = styled.div<{ checkingMark: boolean }>`
  p {
    color: ${(props) => (props.checkingMark ? "grey" : "black")};
    font-size: 30px;
    font-family: "Times New Roman", Times, serif;
  }
  font-size: 10px;
`;
export const StyledLocationFromViews = styled.div<IProps>`
  display: flex;
  flex-direction: ${(props) => (props.viewPage ? "column" : "row")};
  border: 2px solid yellow;
  flex-wrap: wrap;
  justify-content: start;
`;
export const StyledFIlmItemElement = styled.div`
  font-size: 20px;
  width: 250px;
  margin: 3px;
`;
export const CheckAndCrossImg = styled.div`
  img {
    height: 40px;
  }
`;
export const StyledFIlmItem = styled.div<IProps>`
  display: flex;
  flex-direction: ${(props) => (props.viewPage ? "row" : "column")};
  border: 3px solid green;
  height: ${(props) => (props.viewPage ? "100px" : "350px")};
  width: ${(props) => (props.viewPage ? "100%" : "350px")};
  img {
    height: ${(props) => (props.viewPage ? "90px" : "")};
  }
  margin: 5px;
`;
