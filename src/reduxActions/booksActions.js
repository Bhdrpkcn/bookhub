import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,

} from "../reducers/bookSlice";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",

  async ({ page }, { getState, dispatch }) => {
    dispatch(fetchBooksStart());

    const state = getState();
    const searchQuery = state.books.searchQuery;


    const currentPage = page || 1;
    const itemsPerPage = 240;

    const API_URL = `https://example-data.draftbit.com/books?q=${searchQuery}&_page=${currentPage}&_limit=${itemsPerPage}`;

    //not working multiple params :
    //let API_URL = `https://example-data.draftbit.com/books?q=${query}&_page=${currentPage}&_limit=${itemsPerPage}`;

    // if (category) {
    //   API_URL += `&category=${category}`;
    // }

    // if (sortBy && sortOrder) {
    //   API_URL += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    // }

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
