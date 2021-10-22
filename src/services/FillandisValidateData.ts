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

export const isValidFilmsIdAndFilms = (): void => {
  if (localStorage.getItem("filmsId") === null)
    localStorage.setItem("filmsId", JSON.stringify([]));
  if (localStorage.getItem("films") === null)
    localStorage.setItem("films", JSON.stringify([]));
};
export const isValidFilerFilms = (): void => {
  if (localStorage["currentDate"] === undefined) {
    localStorage.setItem("currentDate", JSON.stringify("2021"));
  }

  if (localStorage["range"] === undefined)
    localStorage.setItem("range", JSON.stringify("50"));
};
