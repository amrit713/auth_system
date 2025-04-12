import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("token"); // remove auth token
  window.location.href = "/login"; // redirect to login
  window.location.reload(); // force refresh
};
