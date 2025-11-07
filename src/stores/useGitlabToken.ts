import { IS_DEV_ENV } from "@/api/queryClient";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type GitlabState = {
  token: string;
  path: string;
  initialDate: string;
  endDate: string;
  setToken: (token: string) => void;
  setPath: (path: string) => void;
  setInitialDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clearToken: () => void;
};

const store: StateCreator<GitlabState> = (set): GitlabState => ({
  token: "glpat-BaN21tmSp_wZj1mZJlj2em86MQp1OmV5NnB2Cw.01.12167m9zb",
  path: "traza1/parser_devs/mvp",
  initialDate: "",
  endDate: "",
  setToken: (token: string) => set({ token }),
  setPath: (path: string) => set({ path }),
  setInitialDate: (date: string) => set({ initialDate: date }),
  setEndDate: (date: string) => set({ endDate: date }),
  clearToken: () => set({ token: "" }),
});

export const useGitlab = create<GitlabState>()(
  IS_DEV_ENV
    ? devtools(store, { name: "GitlabStore" })
    : (store as any)
);
