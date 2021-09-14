import { Link } from "react-router-dom";

const Main = (props: any) => {
  const genres = ["Фантастика", "Комедия", "Детектив"];
  localStorage.setItem("genres", JSON.stringify(genres));

  return (
    <div>
      <div>
        <Link to="/login">Log out</Link>
      </div>
      <div>
        <h3>Select you favorite genres</h3>
      </div>
      <h4>You favorite movies</h4>
    </div>
  );
};
export default Main;
