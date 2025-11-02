import { useState } from "react";
import Landing from "../components/Landing";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";

export default function Authentication() {
    const [action, setAction] = useState("login");
    const toggleForm = (action: string) => {
        setAction(action);
    }
  return (
    <div className="flex">
      <Landing />
      {action === "signup" ? (
        <Signup toggleForm={toggleForm} />
      ) : action === "forgot-password" ? (
        <ForgotPassword toggleForm={toggleForm} />
      ) : (
        <Login toggleForm={toggleForm} />
      )}
    </div>
  );
}