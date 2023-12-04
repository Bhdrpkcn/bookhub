import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    favorited: JSON.parse(localStorage.getItem("favorites")) || [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
    sortBy: "",
    displayFavorites: false,
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
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    addToFavorites: (state, action) => {
      const { book } = action.payload;
      const bookId = book.id;

      if (!state.favorited.includes(bookId)) {
        state.favorited.push(bookId);
        localStorage.setItem("favorites", JSON.stringify(state.favorited));
      }
    },

    removeFromFavorites: (state, action) => {
      const { book } = action.payload;
      const bookId = book.id;

      state.favorited = state.favorited.filter(
        (favBookId) => favBookId !== bookId
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorited));
    },
    removeAllFavorites: (state) => {
      state.favorited = [];
      localStorage.removeItem("favorites");
    },
    setDisplayFavorites: (state) => {
      state.displayFavorites = !state.displayFavorites;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setSearchQuery,
  setCurrentPage,
  setSortBy,
  addToFavorites,
  removeFromFavorites,
  removeAllFavorites,
  setDisplayFavorites,
} = booksSlice.actions;

export default booksSlice.reducer;
