import React from "react";
import { setSearchQuery } from "../../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./chattingGhost.scss";

const ChattingGhost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchQuery = useSelector((state) => state.books.searchQuery);

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;

    dispatch(setSearchQuery(newSearchQuery));

    navigate(`?q=${encodeURIComponent(newSearchQuery)}`);
  };

  return (
    <div id="container">
      <input
        id="ghost-input"
        type="text"
        className="searchBar"
        style={{
          width: "40vw",
        }}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="find your books !"

      />
      <div className="ghost">
        <div className="ghost__face">
          <div className="ghost__eyes">
            <span className="ghost__eyes-l"></span>
            <span className="ghost__eyes-r"></span>
          </div>
          <div className="ghost__mouth"></div>
        </div>
        <div className="ghost__torso"></div>

        <div className="ghost__legs"></div>
      </div>
    </div>
  );
};

export default ChattingGhost;
