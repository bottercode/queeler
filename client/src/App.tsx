import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Link to="http://localhost:4000/auth/google">HI</Link>}
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
