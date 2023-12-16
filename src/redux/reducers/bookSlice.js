import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    favorited: JSON.parse(localStorage.getItem("favorites")) || [],
    recommendedBooks: JSON.parse(localStorage.getItem("recBooks")) || [],
    favGenres: JSON.parse(localStorage.getItem("favGenres")) || [],
    recommendedGenres: JSON.parse(localStorage.getItem("recGenres")) || [],
    genreCount: {},
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
    sortBy: "",
    displayFavorites: false,
    displayRecommended: false,
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
      state.displayRecommended = false;
    },
    setDisplayRecommended: (state) => {
      state.displayRecommended = !state.displayRecommended;
      state.displayFavorites = false;
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

        const sortedGenres = Object.entries(state.genreCount).sort(
          (a, b) => b[1] - a[1]
        );

        const topThreeGenres = sortedGenres.slice(0, 3).map(([genre]) => genre);

        const updatedRecommendedBooks = [];

        const findHighestRatedBook = (genre) => {
          return state.data
            .filter(
              (book) =>
                book.genre_list.split(",").includes(genre) &&
                !state.favorited.includes(book.title) &&
                !updatedRecommendedBooks.includes(book.title)
            )
            .sort((a, b) => b.rating - a.rating)[0];
        };

        topThreeGenres.forEach((genre) => {
          const recommendedBook = findHighestRatedBook(genre);

          if (recommendedBook) {
            updatedRecommendedBooks.push(recommendedBook.title);
          }
        });

        state.recommendedBooks = updatedRecommendedBooks;
        localStorage.setItem(
          "recBooks",
          JSON.stringify(state.recommendedBooks)
        );

        state.recommendedGenres = topThreeGenres;
        localStorage.setItem(
          "recGenres",
          JSON.stringify(state.recommendedGenres)
        );
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
    },

    removeAllFavorites: (state) => {
      state.favorited = [];
      state.favGenres = [];
      state.recommendedBooks = [];
      state.recommendedGenres = [];
      localStorage.removeItem("favorites");
      localStorage.removeItem("favGenres");
      localStorage.removeItem("recGenres");
      localStorage.removeItem("recBooks");
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
  setDisplayRecommended,
} = booksSlice.actions;

export default booksSlice.reducer;

const updateGenreCount = (state) => {
  state.genreCount = state.favGenres.reduce((count, genre) => {
    count[genre] = (count[genre] || 0) + 1;
    return count;
  }, {});
};
