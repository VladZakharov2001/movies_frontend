import styled from "styled-components";
export const CheckFilm = styled.div<{ checkingMark: boolean }>`
  p {
    color: ${(props) => (props.checkingMark ? "grey" : "black")};
    font-size: 16px;
    font-family: "Times New Roman", Times, serif;
  }
`;
