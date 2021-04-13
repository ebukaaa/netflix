import { useStore } from "./utils";

export function useSignIn() {
  const { signInStyles, Inputs, onSignIn, onSignUp } = useStore();

  return (
    <form className={signInStyles}>
      <h1>Sign In</h1>

      <Inputs />

      <button type="submit" onClick={onSignIn}>
        Sign In
      </button>

      <h4>
        New to Netflix?{" "}
        <span aria-hidden onClick={onSignUp}>
          Sign Up now.
        </span>
      </h4>
    </form>
  );
}
