import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Queeler</h1>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
