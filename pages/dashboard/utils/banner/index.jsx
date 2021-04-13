import { useStore } from "./utils";

export function useBanner() {
  const {
    styles: { bannerStyles, extraStyles },
    title,
    info,
    truncate,
  } = useStore();

  return (
    <header className={bannerStyles} style={extraStyles}>
      <section>
        <h1>{title}</h1>

        <aside>
          <button type="button">Play</button>
          <button type="button">My List</button>
        </aside>

        <h1>
          {truncate({
            value: info,
            amount: 150,
          })}
        </h1>
      </section>

      <div />
    </header>
  );
}
