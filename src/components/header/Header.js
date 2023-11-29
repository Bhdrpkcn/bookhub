import React from "react";
import "./header.css";
import User from "./User";
import {  setCurrentPage } from "../../redux/reducers/bookSlice";
import { useDispatch } from "react-redux";
const Header = () => {
const dispatch = useDispatch();

  const homeHandler = () =>{

      dispatch(setCurrentPage(1));
  }
  return (
    <div className="header">
      <button onClick={homeHandler}>logo</button>
      <User />
    </div>
  );
};

export default Header;
