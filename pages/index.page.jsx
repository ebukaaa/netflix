import { useStore } from "./utils";

export function useLogin() {
  const { loginStyles, Contents } = useStore();

  return (
    <main className={loginStyles}>
      <Contents />
    </main>
  );
}
export default useLogin;
