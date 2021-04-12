import { useMemo } from "react";
import { useProps as useAppProps } from "../..";
import { bannerStyles } from "./style.module.scss";

function truncate({ value, amount }) {
  return value?.length > amount ? `${value.substr(0, amount - 1)}...` : value;
}

export function useStore() {
  const {
    initProps: { originalsMovie },
  } = useAppProps();

  return {
    styles: useMemo(
      () => ({
        bannerStyles,
        extraStyles: {
          backgroundImage: `url('${process.env.NEXT_PUBLIC_tmdbImageURL}${originalsMovie?.backdrop_path}')`,
        },
      }),
      [originalsMovie?.backdrop_path]
    ),
    title:
      originalsMovie?.title ||
      originalsMovie?.name ||
      originalsMovie?.original_name,
    info: originalsMovie?.overview,
    truncate,
  };
}
