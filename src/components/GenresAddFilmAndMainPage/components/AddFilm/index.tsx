import BlockOrRowViewAdd from "./components/BlockOrRowViewAdd";
import { useState, useEffect } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_RANGE, DEFAULT_YEAR } from "../../../../GlobalConstants";
interface IProps {
  genresId: Array<number>;
  langFlag: string;
  view: boolean;
}
const AddFilm: FC<IProps> = ({ genresId, langFlag, view }): JSX.Element => {
  const [date, setDate] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<number>(DEFAULT_YEAR);
  const [range, setRange] = useState<number>(DEFAULT_RANGE);

  const { t, i18n } = useTranslation();
  useEffect(() => {
    for (let i = 1960; i <= new Date().getFullYear(); i++) {
      date.push(i);
    }
    setDate([...date]);
  }, []);

  return (
    <div>
      <div>
        {t("addFilmPage.popularity")}
        <input
          value={range}
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={(e) => {
            setRange(Number(e.target.value));
          }}
        />
      </div>
      <div>
        {t("addFilmPage.releaseDate")}
        <select
          value={currentDate}
          onChange={(e) => {
            setCurrentDate(Number(e.target.value));
          }}
        >
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
