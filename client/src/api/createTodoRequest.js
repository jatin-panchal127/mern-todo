import { API_URL } from "./config";

export default (todo, token) => {
  return fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: todo.text,
      completed: todo.completed ? todo.completed : false,
    }),
  }).then((res) => {
    return res.json();
  });
};
