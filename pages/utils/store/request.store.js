export const request = {
  trending: `trending/all/week${process.env.TMDB_API_CALL}${process.env.TMDB_LANGUAGE}`,
  originals: `discover/tv${process.env.TMDB_API_CALL}with_networks=213`,
  topRated: `movie/top_rated${process.env.TMDB_API_CALL}${process.env.TMDB_LANGUAGE}`,
  actionMovies: `${process.env.TMDB_DISCOVER_MOVIES}${process.env.TMDB_API_CALL}${process.env.TMDB_WITH_GENRES}28`,
  comedyMovies: `${process.env.TMDB_DISCOVER_MOVIES}${process.env.TMDB_API_CALL}${process.env.TMDB_WITH_GENRES}35`,
  horrorMovies: `${process.env.TMDB_DISCOVER_MOVIES}${process.env.TMDB_API_CALL}${process.env.TMDB_WITH_GENRES}27`,
  romanceMovies: `${process.env.TMDB_DISCOVER_MOVIES}${process.env.TMDB_API_CALL}${process.env.TMDB_WITH_GENRES}10749`,
  documentaries: `${process.env.TMDB_DISCOVER_MOVIES}${process.env.TMDB_API_CALL}${process.env.TMDB_WITH_GENRES}99`,
};
