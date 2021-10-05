import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SessionCheck = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const deleteSession = (): void => {
    localStorage.removeItem("сurrentLogin");
  };
  return (
    <div>
      {t("SessionCheck.hello")},{localStorage.getItem("сurrentLogin")}
      <Link onClick={deleteSession} to="/login">
        {t("SessionCheck.logout")}
      </Link>
    </div>
  );
};
export default SessionCheck;
