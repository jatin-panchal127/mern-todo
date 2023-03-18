import { API_URL } from "./config";

export default (password) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    else throw new Error("Login failed");
  });
};
