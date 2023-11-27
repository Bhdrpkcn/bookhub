import React from "react";
import "./body.css";
import Search from "./Search";
import Greeting from "./Greeting";
import BooksContainer from "./BooksContainer";

const Body = () => {
  return (
    <div className="body">
      <Greeting />
      <Search />
      <BooksContainer />
    </div>
  );
};

export default Body;
