import { Link, NavLink } from "react-router-dom";
const SessionCheck = (): any => {
  const deleteSession = (): void => {
    localStorage.removeItem("сurrentLogin");
  };
  return (
    <div>
      Hello,
      {localStorage.getItem("сurrentLogin") !== null
        ? localStorage.getItem("сurrentLogin")
        : ""}
      <Link onClick={deleteSession} to="/login">
        Log out
      </Link>
    </div>
  );
};
export default SessionCheck;
