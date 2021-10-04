import styled from "styled-components";

export const ChangeView = styled.button<{ blockView: boolean }>`
  button {
    color: ${(props) => (props.blockView ? "blue" : "black")};
    height: 30px;
    width: 50px;
    background-color: white;
  }
`;
