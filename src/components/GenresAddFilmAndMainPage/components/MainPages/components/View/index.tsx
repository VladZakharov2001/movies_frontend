import React, { FC } from "react";
import { ChangeView } from "./styled";

interface IProps {
  viewB: boolean;
  symbolView: string;
  onClick: () => void;
}
const View: FC<IProps> = ({ viewB, symbolView, onClick }): JSX.Element => {
  return (
    <div>
      <ChangeView blockView={!viewB}>
        <button onClick={onClick}>{symbolView}</button>
      </ChangeView>
    </div>
  );
};
export default View;
