import { Navigate, Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import React, { createContext, useContext, useState } from "react";

export const TokenContext = createContext(null);

const ProtectedRoute = ({ element }) => {
  let [token] = useContext(TokenContext);
  let persistToken = token;
  persistToken = persistToken && localStorage.setItem("token", persistToken);
  persistToken = localStorage.getItem("token");
  return persistToken ? element() : <Navigate to="login" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="App">
      <TokenContext.Provider value={[token, setToken]}>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={TodoPage} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
