import styled from "styled-components";
export const CheckFilm = styled.div<{ checkingMark: boolean }>`
  p {
    color: ${(props) => (props.checkingMark ? "grey" : "black")};
  }
`;
