import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link, Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {
  return (
    <>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
