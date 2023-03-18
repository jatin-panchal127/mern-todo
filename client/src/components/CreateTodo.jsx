import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";
import { TokenContext } from "../App";

const CreateTodo = () => {
  const [token] = useContext(TokenContext);

  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <form
      className="mt-20"
      onSubmit={(e) => {
        e.preventDefault();
        setText("");
        if (text !== "") createTodo({ text });
      }}
    >
      <div className="flex items-center m-5">
        <input
          id="text"
          name="text"
          type="text"
          autoComplete="text"
          required
          className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-300 focus:outline-none focus:ring-green-300 sm:text-sm mx-2"
          placeholder="Write a todo..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="group relative flex-1 w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateTodo;
