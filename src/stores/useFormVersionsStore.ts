import type { Version } from "@/api/formsVersions"
import { create } from "zustand"

type FormVersionType = {
  currentVersionName: string | null
  currentVersionID: number | null
  getVersions: Version[] | null
  setCurrentVersionName: (currentVersionName: string | null) => void
  setCurrentVersionID: (currentVersionID: number | null) => void
  setVersions: (versions: Version[] | null) => void
}

const useGetFormVersion = create<FormVersionType>((set) => ({
  currentVersionName: "Versión 1",
  currentVersionID: 1,
  getVersions: null,
  setCurrentVersionName: (currentVersionName) => set({ currentVersionName }),
  setCurrentVersionID: (currentVersionID) => set({ currentVersionID }),
  setVersions: (versions) => set({
    getVersions: versions
  })

}))

export default useGetFormVersion
