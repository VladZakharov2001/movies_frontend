import styled from "styled-components";
interface IProps {
  viewPage: boolean;
}
export const CheckFilm = styled.div<{ checkingMark: boolean }>`
  p {
    color: ${(props) => (props.checkingMark ? "grey" : "black")};
    font-size: 30px;
    font-family: "Times New Roman", Times, serif;
  }
`;
export const FlexItems = styled.div<IProps>`
  display: flex;
  flex-direction: ${(props) => (props.viewPage ? "column" : "row")};
  border: 2px solid yellow;
  flex-wrap: wrap;
  justify-content: start;
`;
export const SmallConteiner = styled.div`
  font-size: 20px;
  width: 350px;
`;
export const CheckAndCross = styled.div`
  img {
    height: 20px;
  }
`;
export const ViewFilms = styled.div<IProps>`
  display: flex;
  flex-direction: ${(props) => (props.viewPage ? "row" : "column")};
  border: 3px solid green;
  height: ${(props) => (props.viewPage ? "100px" : "350px")};
  width: ${(props) => (props.viewPage ? "100%" : "350px")};
  img {
    height: ${(props) => (props.viewPage ? "94px" : "")};
  }
  margin: 5px;
`;
