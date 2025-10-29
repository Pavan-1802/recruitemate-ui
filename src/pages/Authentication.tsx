import { useState } from "react";
import Landing from "../components/Landing";
import Signup from "../components/Signup";
import Login from "../components/Login";

export default function Authentication() {
    const [isNewUser, setIsNewUser] = useState(false);
  return (
    <div className="flex">
      <Landing />
      {isNewUser ? (
        <Signup toggleForm={() => setIsNewUser(false)} />
      ) : (
        <Login toggleForm={() => setIsNewUser(true)} />
      )}
    </div>
  );
}