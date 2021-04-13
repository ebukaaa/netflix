import { useStore } from "./utils";

export function useHeader() {
  const {
    headerStyles,
    contentsStyles,
    isUser,
    Avatar,
    Logo,
    Button,
    onProfile,
    onDashboard,
  } = useStore();

  return (
    <main className={headerStyles}>
      <aside className={contentsStyles}>
        <Logo onClick={onDashboard} />

        {!isUser ? <Button /> : <Avatar onClick={onProfile} />}
      </aside>
    </main>
  );
}
