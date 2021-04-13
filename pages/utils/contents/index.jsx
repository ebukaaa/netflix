import { useStore } from "./utils";

export function useContents() {
  const { contentsStyles, isSignedIn, Main, SignIn } = useStore();

  return (
    <main className={contentsStyles}>
      {!isSignedIn ? <Main /> : <SignIn />}
    </main>
  );
}
