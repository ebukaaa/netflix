import { useStore } from "./utils";

export function useHeader() {
  const { headerStyles, contentsStyles, Avatar, Logo } = useStore();

  return (
    <main className={headerStyles}>
      <aside className={contentsStyles}>
        <Logo />
        <Avatar />
      </aside>
    </main>
  );
}
