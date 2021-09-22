import styled from "styled-components";

export const CheckGanres = styled.button<{ watched: boolean }>`
  background-color: ${(props) => (props.watched ? "ffffff" : "yellow")};
`;
