export const isValidUser = (login: string, password: string): Boolean => {
  const usersSting = localStorage.getItem("users");

  if (usersSting === null) return false;

  if (password !== JSON.parse(usersSting)[login]) {
    return true;
  } else {
    return false;
  }
};
