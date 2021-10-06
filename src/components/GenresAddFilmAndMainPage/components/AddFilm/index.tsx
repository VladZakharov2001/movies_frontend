import BlockOrRowViewAdd from "./components/BlockOrRowViewAdd";
import { FC } from "react";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
}
const AddFilm: FC<IProps> = ({ genresId, langFlag }): JSX.Element => {
  return (
    <div>
      <BlockOrRowViewAdd genresId={genresId} langFlag={langFlag} />
    </div>
  );
};
export default AddFilm;
