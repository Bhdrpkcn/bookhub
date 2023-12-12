import React, { useEffect } from "react";
import User from "./User";
import { fetchBooks } from "..//..//redux/reduxActions/booksActions";
import {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
  removeAllFavorites,
  setDisplayFavorites,
} from "../../redux/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Dropdown, Button, Menu, Badge } from "antd";

const Header = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useSelector((state) => state.books.searchQuery);
  const currentPage = useSelector((state) => state.books.currentPage);
  const displayFavorites = useSelector((state) => state.books.displayFavorites);
  const favoritedCount = useSelector((state) => state.books.favorited.length);

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;

    dispatch(setSearchQuery(newSearchQuery));

    navigate(`?q=${encodeURIComponent(newSearchQuery)}`);
  };

  const handlePageChange = () => {
    const queryParams = new URLSearchParams(location.search);
    const nextPage = currentPage + 1;

    dispatch(setCurrentPage(nextPage));

    queryParams.set("_page", String(nextPage));

    navigate(`?${queryParams.toString()}`);

    dispatch(fetchBooks());
  };

  const handleSortByRating = () => {
    const queryParams = new URLSearchParams(location.search);
    const newSort = "rating&_order=desc"; //added order=asc for lowest rating first

    dispatch(setSortBy(newSort));

    queryParams.set("_sortBy", newSort);
    queryParams.set("_page", "1");

    navigate(`?${queryParams.toString()}`);
    dispatch(setCurrentPage(1));
    dispatch(fetchBooks());
  };

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

  const resetStateToDefault = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchQuery(""));
    dispatch(setSortBy(""));
    navigate(`/`);

    dispatch(fetchBooks());
  };

  const homeHandler = () => {
    resetStateToDefault();
  };

  //move this into BookCard top.
  const handleClearLocalStorage = () => {
    dispatch(removeAllFavorites());
  };

  const showFavorites = () => {
    dispatch(setDisplayFavorites());
  };

  const items = [
    {
      key: "1",
      onclick: { handleSortByRating },
      label: <div onClick={handleSortByRating}>order</div>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const orderMenu = (
    <Menu onClick={handleSortByRating}>
      <Menu.Item key="asc">Ascending</Menu.Item>
      <Menu.Item key="desc">Descending</Menu.Item>
    </Menu>
  );

  return (
    <div className="headers">
      <div className="headerBar">
        <div style={{ cursor: "pointer" }} onClick={homeHandler}>
          BookHUB
        </div>
        {/* <Search
          className="searchBar"
          style={{
            width: "40vw",
          }}
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="find your books !"
          enterButton
        /> */}

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
            <Button onClick={showFavorites}>Favorites</Button>
          </Badge>
        )}
        {displayFavorites && <Button onClick={showFavorites}>Show All</Button>}

        <div>Recommend</div>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Button>sort Order</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;

{
  /* <button onClick={handlePageChange}>Load Next Page</button>
<button onClick={handleSortByRating}>Sort By Rating</button> */
}
