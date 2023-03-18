import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import deleteTodoRequest from "../api/deleteTodoRequest";
import updateTodoRequest from "../api/updateTodoRequest";
import { debounce } from "lodash";
import { TokenContext } from "../App";

const TodoItem = ({ todo }) => {
  const [token] = useContext(TokenContext);
  const queryClient = useQueryClient();
  const [text, setText] = useState(todo.text);

  const { mutate: updateTodo } = useMutation(
    (updatedTodo) => updateTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const { mutate: deleteTodo } = useMutation(
    (updatedTodo) => deleteTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const debouncedUpdatedTodo = useCallback(debounce(updateTodo, 600), [
    updateTodo,
  ]);

  useEffect(() => {
    if (text !== todo.text) {
      debouncedUpdatedTodo({ ...todo, text });
    }
  }, [text]);

  return (
    <div className="flex items-center m-5 border p-2 rounded-md">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer mx-2"
        onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        checked={todo.completed}
      />
      <input
        id="text"
        name="text"
        type="text"
        autoComplete="text"
        required
        className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-300 focus:outline-none focus:ring-green-300 sm:text-sm mx-2"
        placeholder="Write a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => deleteTodo(todo)}
        className="group relative flex-1 w-full justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
