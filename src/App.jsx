import React, { useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import List from "./components/List/List";

export default function App() {
  const [isAuth, setisAuth] = useState(true);
  return (
    <div>
      {isAuth ? <List /> : <SignIn isAuth={isAuth} setisAuth={setisAuth} />}
    </div>
  );
}
