import BlockOrRowViewAdd from "./components/BlockOrRowViewAdd";
import { useState, useEffect } from "react";
import { FC } from "react";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
  view: boolean;
}
const AddFilm: FC<IProps> = ({ genresId, langFlag, view }): JSX.Element => {
  const [date, setDate] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("2021");
  const [range, setRange] = useState<string>("50");

  useEffect(() => {
    for (let i = 1960; i <= new Date().getFullYear(); i++) {
      date.push(i);
    }
    setDate([...date]);
  }, []);

  return (
    <div>
      <div>
        Popularity
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={(e) => setRange(e.target.value)}
        />
      </div>
      <div>
        Relaze year:
        <select onChange={(e) => setCurrentDate(e.target.value)}>
          {date && date.map((dateNum, index) => <option>{dateNum}</option>)}
        </select>
      </div>
      <div>
        <BlockOrRowViewAdd
          genresId={genresId}
          langFlag={langFlag}
          range={range}
          currentDate={currentDate}
          view={view}
        />
      </div>
    </div>
  );
};
export default AddFilm;
