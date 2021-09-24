import React, { FC } from "react";
import { ChangeView } from "./styled";

interface Props {
  viewB: boolean;
  symbolb: string;
  onClick: () => void;
}
const View: FC<Props> = ({ viewB, symbolb, onClick }): any => {
  return (
    <div>
      <ChangeView blockView={!viewB}>
        <button onClick={onClick}>{symbolb}</button>
      </ChangeView>
    </div>
  );
};
export default View;
