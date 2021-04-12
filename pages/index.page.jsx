import { useProps as appProps, useStore } from "./utils";

export function useHome(props) {
  const { homeStyles, rows, Header, Banner, Row } = useStore({ data: props });

  return (
    <main className={homeStyles}>
      <Header />
      <Banner />
      {rows.map(({ title, isLarge, fetch }) => (
        <Row key={title} title={title} isLarge={isLarge} fetch={fetch} />
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const {
    request: {
      originals,
      trending,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
  } = appProps();

  const orginalsResponse = await fetch(process.env.TMDB_URL + originals);
  const { results: originalsResults } = await orginalsResponse.json();
  const { floor, random } = Math;
  const originalsMovie =
    originalsResults[floor(random() * originalsResults?.length - 1)] || {};

  const trendingResponse = await fetch(process.env.TMDB_URL + trending);
  const { results: trendingResults } = await trendingResponse.json();

  const topRatedResponse = await fetch(process.env.TMDB_URL + topRated);
  const { results: topRatedResults } = await topRatedResponse.json();

  const actionMoviesResponse = await fetch(process.env.TMDB_URL + actionMovies);
  const { results: actionMoviesResults } = await actionMoviesResponse.json();

  const comedyMoviesResponse = await fetch(process.env.TMDB_URL + comedyMovies);
  const { results: comedyMoviesResults } = await comedyMoviesResponse.json();

  const horrorMoviesResponse = await fetch(process.env.TMDB_URL + horrorMovies);
  const { results: horrorMoviesResults } = await horrorMoviesResponse.json();

  const romanceMoviesResponse = await fetch(
    process.env.TMDB_URL + romanceMovies
  );
  const { results: romanceMoviesResults } = await romanceMoviesResponse.json();

  const documentariesResponse = await fetch(
    process.env.TMDB_URL + documentaries
  );
  const { results: documentariesResults } = await documentariesResponse.json();

  return {
    props: {
      originalsResults,
      originalsMovie,
      trendingResults,
      topRatedResults,
      actionMoviesResults,
      comedyMoviesResults,
      horrorMoviesResults,
      romanceMoviesResults,
      documentariesResults,
    },
    revalidate: 1,
  };
}
export default useHome;
