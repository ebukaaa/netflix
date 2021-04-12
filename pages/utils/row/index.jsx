import { useStore } from "./utils";

export function useRow({ title, isLarge, fetch }) {
  const { rowStyles, posterStyles, movies, Image } = useStore({
    fetch,
    isLarge,
  });

  return (
    <main className={rowStyles}>
      <h2>{title}</h2>

      <ul>
        {movies.map(
          ({
            id,
            poster_path: posterPath,
            backdrop_path: backdropPath,
            original_name: name,
          }) => (
            <li key={id} className={posterStyles}>
              {((isLarge && posterPath) || (!isLarge && backdropPath)) && (
                <Image
                  alt={name}
                  src={`${process.env.NEXT_PUBLIC_tmdbImageURL}${
                    isLarge ? posterPath : backdropPath
                  }`}
                  height={isLarge ? 250 : 100}
                  width={136}
                  layout="fixed"
                  objectFit="contain"
                />
              )}
            </li>
          )
        )}
      </ul>
    </main>
  );
}
