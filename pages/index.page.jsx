import { useStore } from "./utils";

export function useLogin() {
  const { loginStyles, Contents } = useStore();

  return (
    <main className={loginStyles}>
      <title>Ebuka - Netflix</title>

      <Contents />
    </main>
  );
}
export default useLogin;
