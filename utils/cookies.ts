import Cookies from "js-cookie";
export function setCookie(name: string, value: string, expires: number) {
  Cookies.set(name, value, { expires: expires, path: "/" });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function deleteCookie(name: string) {
  Cookies.remove(name, { path: "/" });
}
