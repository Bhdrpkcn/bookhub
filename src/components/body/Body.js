import React from "react";
import "../style.css";
import BooksContainer from "./BooksContainer";
import SideBar from "./SideBar";
const Body = () => {

  //MAYBE: move greetings into the sidebar ? or user specs part etc.
  return (
    <div className="body">
      {/* <Greeting /> */}
      {/* <SideBar /> */}
      <BooksContainer />
    </div>
  );
};

export default Body;
