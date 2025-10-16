import { create } from "zustand"

type FormType = {
  formParentName: string | null
  formParentID: string | null
  formID: string | null
  formName: string | null
  setFormID: (formID: string | null) => void
  setFormParentID: (formParentID: string | null) => void
  setFormName: (formName: string | null) => void
  setFormParentName: (formParentName: string | null) => void
}

const useGetIDForm = create<FormType>((set) => ({
  formID: null,
  formParentID: null,
  formParentName: null,
  formName: null,
  setFormID: (formID) => set({ formID }),
  setFormParentID: (formParentID) => set({ formParentID }),
  setFormName: (formName) => set({ formName }),
  setFormParentName: (formParentName) => set({ formParentName })
}))


export default useGetIDForm

