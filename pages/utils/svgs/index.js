import dynamic from "next/dynamic";

const useLogo = dynamic(() => import("./logo").then((mod) => mod.useLogo));
const useAvatar = dynamic(() =>
  import("./avatar").then((mod) => mod.useAvatar)
);

export function useSVGs() {
  return { useLogo, useAvatar };
}
