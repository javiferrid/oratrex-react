export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem("auth_token", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};

export const getNavigatorLanguage = () => {
  const navLang = window.navigator.language;
  return navLang.split("-")[0];
};
