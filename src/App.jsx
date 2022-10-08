import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Play from "./components/Play";
import './App.css';


const App = () => {
  const [username, setUsername] = useState("")
  const userNull = useState(null)
  const [userPlay, setUserPlay] = useState("")

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(userNull));
  })
  console.log(username)
  return (
    <BrowserRouter>
      <div className="app">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home setUserPlay={setUserPlay} userPlay={userPlay} />} />
          <Route path="/play" element={<Play setUsername={setUsername} username={username} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
