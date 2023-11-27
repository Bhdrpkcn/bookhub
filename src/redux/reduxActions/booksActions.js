import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} from "../reducers/bookSlice";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",

  async (_, { getState, dispatch }) => {
    dispatch(fetchBooksStart());

    const state = getState();
    const { searchQuery, currentPage } = state.books;

    const itemsPerPage = 20;

    const API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_page=${currentPage}&_limit=${itemsPerPage}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("API Data:", data);

      dispatch(fetchBooksSuccess(data));

      return data;
    } catch (error) {
      console.error("API Error:", error.message);

      dispatch(fetchBooksFailure(error.message));
      throw error;
    }
  }
);
