import { useStore } from "./utils";

export function useButton() {
  const { buttonStyles, onSignIn } = useStore();

  return (
    <button type="button" className={buttonStyles} onClick={onSignIn}>
      Sign In
    </button>
  );
}
