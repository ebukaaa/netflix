import { useProps as appProps, useStore } from "./utils";

export function useHome(props) {
  const { homeStyles, Header, Banner } = useStore({ data: props });

  return (
    <main className={homeStyles}>
      <Header />
      <Banner />
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

  const orginalsResponse = await fetch(process.env.tmdbURL + originals);
  const { results: originalsResults } = await orginalsResponse.json();
  const { floor, random } = Math;
  const originalsMovie =
    originalsResults[floor(random() * originalsResults?.length - 1)];

  const trendingResponse = await fetch(process.env.tmdbURL + trending);
  const { results: trendingResults } = await trendingResponse.json();

  const topRatedResponse = await fetch(process.env.tmdbURL + topRated);
  const { results: topRatedResults } = await topRatedResponse.json();

  const actionMoviesResponse = await fetch(process.env.tmdbURL + actionMovies);
  const { results: actionMoviesResults } = await actionMoviesResponse.json();

  const comedyMoviesResponse = await fetch(process.env.tmdbURL + comedyMovies);
  const { results: comedyMoviesResults } = await comedyMoviesResponse.json();

  const horrorMoviesResponse = await fetch(process.env.tmdbURL + horrorMovies);
  const { results: horrorMoviesResults } = await horrorMoviesResponse.json();

  const romanceMoviesResponse = await fetch(
    process.env.tmdbURL + romanceMovies
  );
  const { results: romanceMoviesResults } = await romanceMoviesResponse.json();

  const documentariesResponse = await fetch(
    process.env.tmdbURL + documentaries
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
