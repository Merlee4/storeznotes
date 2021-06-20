import React from "react";
import Login from "./Login";
import Home from "./Home";

function Main() {
  const client = localStorage.getItem("client");
  return (
    <>
      {/* Render Home when login */}
      {client && <Home />}
      {!client && <Login />}
    </>
  );
}

export default Main;
