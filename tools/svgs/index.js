import dynamic from "next/dynamic";

export const useLogo = dynamic(() =>
  import("./logo").then((mod) => mod.useLogo)
);
export const useAvatar = dynamic(() =>
  import("./avatar").then((mod) => mod.useAvatar)
);
