import React from "react";
import "./greeting.css";
import { useSelector } from "react-redux";

const Greeting = () => {
  const userName = useSelector((state) => state.greeting.userName);

  return (
    <>
      {userName && (
        <div className="greetingBody">
          Hi {userName}! Let's find your books!
        </div>
      )}
    </>
  );
};

export default Greeting;
