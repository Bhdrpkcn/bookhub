import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setCurrentPage,
  setSortBy,
} from "../reducers/bookSlice";

export const itemsPerPage = 20;
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",

  async (_, { getState, dispatch }) => {
    try {
      dispatch(fetchBooksStart());

      const state = getState();
      const {
        searchQuery,
        currentPage,
        sortBy,
        displayFavorites,
        displayRecommended,
      } = state.books;

      let API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_sort=${sortBy}`;

      if (!displayFavorites) {
        API_URL = `${API_URL}&_page=${currentPage}&_limit=${itemsPerPage}`;
      }

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (displayFavorites) {
        const favoritedTitles = state.books.favorited;
        const favoritesData = data.filter((book) =>
          favoritedTitles.includes(book.title)
        );

        dispatch(fetchBooksSuccess(favoritesData));
      } else if (displayRecommended) {
        const initialRecommendedBooks = state.books.recommendedBooks;
        const recommendedBooksData = data.filter((book) =>
          initialRecommendedBooks.includes(book.title)
        );

        dispatch(fetchBooksSuccess(recommendedBooksData));
        dispatch(setCurrentPage(1));
        dispatch(setSortBy(sortBy));
      } else {
        dispatch(setCurrentPage(currentPage));
        dispatch(setSortBy(sortBy));
        dispatch(fetchBooksSuccess(data));
      }
      console.log("DisplayRecommend boolean value:", displayRecommended);

      return data;
    } catch (error) {
      console.error("API Error:", error.message);

      dispatch(fetchBooksFailure(error.message));
      throw error;
    }
  }
);
