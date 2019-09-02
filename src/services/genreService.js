import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return http.get(apiUrl + "/genres");
}

// import http from "./httpService";

// export function getGenres() {
//   return http.get("http://localhost:3000/api/genres");
// }
