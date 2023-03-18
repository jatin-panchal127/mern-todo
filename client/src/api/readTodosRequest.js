import { API_URL } from "./config";

export default (token) => {
  return fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};
