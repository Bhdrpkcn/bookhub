import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
    sortBy: "",
    sortOrder: "",
  },

  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
});


export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setSearchQuery,
  setCurrentPage,
} = booksSlice.actions;

export default booksSlice.reducer;
