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
    dispatch(fetchBooksStart());

    const state = getState();
    const { searchQuery, currentPage, sortBy } = state.books;

    const itemsPerPage = 20;

    const queryParams = new URLSearchParams();
    queryParams.set("_page", currentPage);
    queryParams.set("_sortBy", "sortBy");
    queryParams.set("q", searchQuery);

    const API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_page=${currentPage}&_sort=${sortBy}&_limit=${itemsPerPage}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log(
        "sort:",
        sortBy,
        "page:",
        currentPage,
        "search",
        searchQuery,
        "API Data:",
        data
      );

      dispatch(setCurrentPage(currentPage));
      dispatch(setSortBy(sortBy));
      dispatch(fetchBooksSuccess(data));

      return data;
    } catch (error) {
      console.error("API Error:", error.message);

      dispatch(fetchBooksFailure(error.message));
      throw error;
    }
  }
);
