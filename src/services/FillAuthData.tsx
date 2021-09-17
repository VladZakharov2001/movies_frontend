import { USERS } from "../components/Authorization/constants";

export const FillAuthData = (): void => {
  if (localStorage.getItem("users") === "null") {
    localStorage.setItem("users", JSON.stringify(USERS));
  }
};
