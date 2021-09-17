export const isValidUser = (login: string, password: string): Boolean => {
  const usersString = localStorage.getItem("users");  
  if (usersString === null) return false;

  if (password !== JSON.parse(usersString)[login]) {
    return true;
  } else {
    return false;
  }
};
