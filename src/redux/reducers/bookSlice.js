import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    favorited: JSON.parse(localStorage.getItem("favorites")) || [],
    favGenres: JSON.parse(localStorage.getItem("favGenres")) || [],
    genreCount: {}, 
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
    setDisplayFavorites: (state) => {
      state.displayFavorites = !state.displayFavorites;
    },
    addToFavorites: (state, action) => {
      const { book } = action.payload;
      const bookTitle = book.title;

      if (!state.favorited.includes(bookTitle)) {
        state.favorited.push(bookTitle);
        localStorage.setItem("favorites", JSON.stringify(state.favorited));


        const genres = book.genre_list.split(",");
        state.favGenres.push(...genres);
        localStorage.setItem("favGenres", JSON.stringify(state.favGenres));


        updateGenreCount(state);


        console.log("Updated favorited array:", state.favorited);
        console.log("Updated favGenres array:", state.favGenres.slice()); // Convert to plain array
        console.log("Genre count:", state.genreCount);
      }
    },

    removeFromFavorites: (state, action) => {
      const { book } = action.payload;
      const bookTitle = book.title;

      state.favorited = state.favorited.filter(
        (favBookTitle) => favBookTitle !== bookTitle
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorited));


      const genresToRemove = book.genre_list.split(",");
      state.favGenres = state.favGenres.filter(
        (genre) => !genresToRemove.includes(genre)
      );
      localStorage.setItem("favGenres", JSON.stringify(state.favGenres));


      updateGenreCount(state);


      console.log("Updated favorited array:", state.favorited);
      console.log("Updated favGenres array:", state.favGenres.slice()); // Convert to plain array
      console.log("Genre count:", state.genreCount);
    },

    removeAllFavorites: (state) => {
      state.favorited = [];
      state.favGenres = []; 
      localStorage.removeItem("favorites");
      localStorage.removeItem("favGenres");
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

const updateGenreCount = (state) => {
  state.genreCount = state.favGenres.reduce((count, genre) => {
    count[genre] = (count[genre] || 0) + 1;
    return count;
  }, {})};
