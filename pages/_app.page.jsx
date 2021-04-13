import "./style.scss";
import { useAppStore } from "./utils";

export function useApp({ Component, pageProps }) {
  const { Header } = useAppStore();

  return (
    <main id="app">
      <Header />

      <Component {...pageProps} />
    </main>
  );
}
export default useApp;
