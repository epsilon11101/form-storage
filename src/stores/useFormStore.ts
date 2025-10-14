import { create } from "zustand"

type FormType = {
  formName: string
  formID: string | null
  setFormID: (formID: string | null) => void
  setFormName: (formName: string) => void
}

const useGetIDForm = create<FormType>((set) => ({
  formID: null,
  formName: "",
  setFormID: (formID) => set({ formID }),
  setFormName: (formName) => set({ formName })
}))


export default useGetIDForm

