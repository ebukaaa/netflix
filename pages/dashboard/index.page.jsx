import { useProps as dashboardProps, useStore } from "./utils";

export function useDashboard(props = {}) {
  const { homeStyles, rows, Banner, Row } = useStore({
    data: props,
  });

  return (
    <main className={homeStyles}>
      <Banner />

      {rows.map(({ title, isLarge, fetch }) => (
        <Row key={title} title={title} isLarge={isLarge} fetch={fetch} />
      ))}
    </main>
  );
}

export async function getServerSideProps({ query }) {
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
    db,
  } = dashboardProps();
  const { id } = query;

  let subscription;

  await db
    .collection("customers")
    .doc(id)
    .collection("subscriptions")
    .get()
    .then((docs) =>
      docs.forEach(async (doc) => {
        subscription = {
          role: doc.data().role,
          current_period_end: doc.data().current_period_end.seconds,
          current_period_start: doc.data().current_period_start.seconds,
        };
      })
    );

  if (!subscription) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  const orginalsResponse = await fetch(process.env.TMDB_URL + originals);
  const { results: originalsResults } = await orginalsResponse.json();
  const { floor, random } = Math;

  let originalsMovie =
    originalsResults[floor(random() * originalsResults?.length - 1)] || {};

  while (originalsMovie?.backdrop_path === undefined) {
    originalsMovie =
      originalsResults[floor(random() * originalsResults?.length - 1)];
  }

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
  };
}

export default useDashboard;
