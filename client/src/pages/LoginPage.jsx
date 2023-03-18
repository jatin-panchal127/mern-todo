import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginRequest from "../api/loginRequest";
import { TokenContext } from "../App";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [token, setToken] = useContext(TokenContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(password)
      .then(({ token }) => {
        setToken(token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 drop-shadow-lg">
      <div className="w-full max-w-md space-y-8 border rounded-md p-5 lg:py-36 md:py-28 py:0">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>
        <div className="text-red-500 font-semibold text-lg text-center tracking-wide">
          {error}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
