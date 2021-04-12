export const request = {
  trending: `trending/all/week${process.env.tmdbApiCall}${process.env.tmdbLanguage}`,
  originals: `${process.env.tmdbDiscover}/tv${process.env.tmdbApiCall}with_networks=213`,
  topRated: `${process.env.tmdbMovie}/top_rated${process.env.tmdbApiCall}${process.env.tmdbLanguage}`,
  actionMovies: `${process.env.tmdbDiscoverMovies}${process.env.tmdbApiCall}${process.env.tmdbWithGenres}28`,
  comedyMovies: `${process.env.tmdbDiscoverMovies}${process.env.tmdbApiCall}${process.env.tmdbWithGenres}35`,
  horrorMovies: `${process.env.tmdbDiscoverMovies}${process.env.tmdbApiCall}${process.env.tmdbWithGenres}27`,
  romanceMovies: `${process.env.tmdbDiscoverMovies}${process.env.tmdbApiCall}${process.env.tmdbWithGenres}10749`,
  documentaries: `${process.env.tmdbDiscoverMovies}${process.env.tmdbApiCall}${process.env.tmdbWithGenres}99`,
};
