import { useStore } from "./utils";

export function useMain() {
  const { mainStyles, putSignIn } = useStore();

  return (
    <main className={mainStyles}>
      <h1>Unlimited films, TV programmes and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <h3>
        Ready to watch? Enter your email to create or restart your membership.
      </h3>

      <form>
        <input type="email" placeholder="Email Address" name="email" />
        <button type="button" onClick={putSignIn.bind(null, true)}>
          GET STARTED
        </button>
      </form>
    </main>
  );
}
