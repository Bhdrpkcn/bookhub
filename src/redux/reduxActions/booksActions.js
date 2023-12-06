import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setCurrentPage,
  setSortBy,
} from "../reducers/bookSlice";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",

  async (_, { getState, dispatch }) => {
    try {
      dispatch(fetchBooksStart());

      const state = getState();
      const { searchQuery, currentPage, sortBy, displayFavorites } =
        state.books;

      const itemsPerPage = 10;

      let API_URL;

      if (displayFavorites) {
        // Fetch all favorited items, ignoring pagination
        API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_sort=${sortBy}`;
      } else {
        // Fetch based on pagination and other parameters
        API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_page=${currentPage}&_sort=${sortBy}&_limit=${itemsPerPage}`;
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
      } else {
        dispatch(setCurrentPage(currentPage));
        dispatch(setSortBy(sortBy));
        dispatch(fetchBooksSuccess(data));
      }

      return data;
    } catch (error) {
      console.error("API Error:", error.message);

      dispatch(fetchBooksFailure(error.message));
      throw error;
    }
  }
);
