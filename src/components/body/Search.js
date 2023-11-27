import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSearchQuery } from "../../redux/reducers/bookSlice";
import "./search.css";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useSelector((state) => state.books.searchQuery);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q") || "";

    // Update Redux state with the search query from URL
    dispatch(setSearchQuery(q));
  }, [location.search, dispatch]);

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;

    // Dispatch action to update searchQuery in Redux state
    dispatch(setSearchQuery(newSearchQuery));

    // Update URL parameters using React Router's navigate
    navigate(`?q=${encodeURIComponent(newSearchQuery)}`);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Let's Search books..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
