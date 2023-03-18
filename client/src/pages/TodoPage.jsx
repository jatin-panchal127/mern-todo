import React, { useContext } from "react";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import readTodosRequest from "../api/readTodosRequest";
import TodoItem from "../components/TodoItem";
import CreateTodo from "../components/CreateTodo";
import { TokenContext } from "../App";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [token] = useContext(TokenContext);
  const navigate = useNavigate();

  const { isLoading, data: todos } = useQuery("todos", () =>
    readTodosRequest(token)
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("login");
  };

  return (
    <div className="my-20 mx-auto">
      <div className="m-5 font-semibold tracking-wide text-xl border p-4 rounded-md lg:flex md:flex sm:flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="mx-5 h-12 w-auto" />
          <span>TODO - Start writing your works...</span>
        </div>
        <div className="flex lg:mt-0 md:mt-0 mt-4 sm:mt-4">
          <button
            onClick={handleLogout}
            className="group relative w-full justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <ClipLoader size={150} />
        </div>
      ) : todos.length ? (
        todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
      ) : (
        <div className="m-5 font-semibold tracking-wide text-xl border p-4 rounded-md flex items-center">
          <span>No Todo's yet, start adding now!</span>
        </div>
      )}
      <CreateTodo />
    </div>
  );
};

export default TodoPage;
