import React from "react";
import "./body.css";
import Greeting from "./Greeting";
import BooksContainer from "./BooksContainer";
import SideBar from "./SideBar";
const Body = () => {
  return (
    <div className="body">
      <Greeting />
      <div style={{
        display:"flex",
        flexDirection:"row"
      }}>
        <SideBar />
        <BooksContainer />
      </div>
    </div>
  );
};

export default Body;
