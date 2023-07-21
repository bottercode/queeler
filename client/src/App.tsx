import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
