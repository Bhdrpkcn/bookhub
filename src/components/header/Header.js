import React, { useEffect } from "react";
import User from "./User";
import { fetchBooks } from "..//..//redux/reduxActions/booksActions";
import {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
  removeAllFavorites,
  setDisplayFavorites,
  setDisplayRecommended,
} from "../../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Badge, Select } from "antd";
import ChattingGhost from "./ChattingGhost";
import Logo from "../../utils/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const displayFavorites = useSelector((state) => state.books.displayFavorites);
  const displayRecommended = useSelector(
    (state) => state.books.displayRecommended
  );
  const favoritedCount = useSelector((state) => state.books.favorited.length);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q") || "";
    const page = queryParams.get("_page") || 1;
    const sortBy = queryParams.get("_sortBy") || "";

    dispatch(setSearchQuery(q));
    dispatch(setCurrentPage(Number(page)));
    dispatch(setSortBy(sortBy));
    dispatch(fetchBooks());
  }, [location.search, dispatch]);

  const homeHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchQuery(""));
    dispatch(setSortBy(""));
    navigate(`/`);
    dispatch(removeAllFavorites());
    dispatch(fetchBooks());
  };

  const showFavorites = () => {
    dispatch(setDisplayFavorites());
  };
  const showRecommended = async () => {
    dispatch(setDisplayRecommended());
  };

  const handleSortByRating = (value) => {
    const queryParams = new URLSearchParams(location.search);
    const newSort = value;

    dispatch(setSortBy(newSort));

    queryParams.set("_sortBy", newSort);
    queryParams.set("_page", "1");

    navigate(`?${queryParams.toString()}`);
    dispatch(setCurrentPage(1));
    dispatch(fetchBooks());
  };

  return (
    <div className="headers">
      <div className="headerBar">
        <img
          src={Logo}
          alt="bookLogo"
          className="homeLogo"
          onClick={homeHandler}
        />
        <ChattingGhost />
        <User />
      </div>
      <div className="secHeaderBar">
        {!displayFavorites && (
          <Badge
            style={{
              marginRight: "1rem",
            }}
            count={favoritedCount}
          >
            <Button style={{ width: 120 }} onClick={showFavorites}>Favorites</Button>
          </Badge>
        )}
        {displayFavorites && <Button style={{ width: 120 }} onClick={showFavorites}>Show All</Button>}

        {!displayRecommended && (
          <Button style={{ width: 130 }} onClick={showRecommended}>Recommended</Button>
        )}
        {displayRecommended && (
          <Button style={{ width: 130 }}onClick={showRecommended}>Show All</Button>
        )}

        <Select
          defaultValue="rating&_order=asc"
          style={{ width: 120 }}
          
          onChange={handleSortByRating}
          options={[
            { value: "rating&_order=desc", label: "Descending" },
            { value: "rating&_order=asc", label: "Ascending" },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;
