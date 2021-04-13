import { useStore } from "./utils";

export function useLoading() {
  const { loadingStyles, isShown } = useStore();

  return (
    isShown && (
      <div className={loadingStyles}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  );
}
