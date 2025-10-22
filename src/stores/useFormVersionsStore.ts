import { create } from "zustand"

type FormVersionType = {
  currentVersion: string | null
  versions: Array<string> | []
  setCurrentFormVersion: (currentVersion: string | null) => void
  setVersions: (selectedVersion: number | null, allVersions: Array<string> | null) => void
}


const useGetFormVersion = create<FormVersionType>((set) => ({
  currentVersion: null,
  versions: [],
  setCurrentFormVersion: (currentVersion) => set({ currentVersion }),
  setVersions: (selectedVersion, allVersions) => {

    const safeVersions = allVersions ?? []
    const currentSelected =
      selectedVersion && selectedVersion > 0
        ? safeVersions[selectedVersion - 1]
        : safeVersions[0] ?? null

    set({
      currentVersion: currentSelected,
      versions: safeVersions,
    })
  },
}))


export default useGetFormVersion
