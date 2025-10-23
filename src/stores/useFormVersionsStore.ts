import { create } from "zustand"

type FormVersionType = {
  currentVersionName: string | null
  currentVersionID: number | null
  setCurrentVersionName: (currentVersionName: string | null) => void
  setCurrentVersionID: (currentVersionID: number | null) => void
}

const useGetFormVersion = create<FormVersionType>((set) => ({
  currentVersionName: "Version 1",
  currentVersionID: 1,
  setCurrentVersionName: (currentVersionName) => set({ currentVersionName }),
  setCurrentVersionID: (currentVersionID) => set({ currentVersionID }),
}))

export default useGetFormVersion
