import Cookies from "js-cookie";

// find out user is authenitcated or not
export const useAuth = (): boolean => {
  const token = Cookies.get("token");

  return !!token;
};
