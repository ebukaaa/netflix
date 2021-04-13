import Image from "next/image";
import { useMemo } from "react";
import { useProps as useAppProps } from "../..";
import { rowStyles, large as largePosterStyles } from "./style.module.scss";

export function useStore({ fetch, isLarge }) {
  const { initProps } = useAppProps();

  return {
    rowStyles,
    posterStyles: useMemo(() => `${isLarge && largePosterStyles}`, [isLarge]),
    movies: useMemo(() => initProps[fetch], [initProps, fetch]),
    Image,
  };
}
