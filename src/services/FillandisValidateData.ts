const USERS = {
  "vlad@": "vlad2",
  "vlad@2": "vlad3",
};

export const FillAuthData = (): void => {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(USERS));
  }
};

export const isValidUser = (login: string, password: string): Boolean => {
  const usersString = localStorage.getItem("users");
  if (usersString === null) return false;
  return password !== JSON.parse(usersString)[login];
};
