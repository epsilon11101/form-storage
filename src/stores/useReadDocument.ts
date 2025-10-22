import { create } from "zustand"
import type { RJSFSchema, UiSchema } from "@rjsf/utils"
import type { RefObject } from "react"

interface ReadDocumentInterface {
  schema: RJSFSchema | null
  uiSchema: UiSchema | null
  formData: Record<string, any>
  isLoading: boolean
  isSaving: boolean
  printRef: RefObject<HTMLDivElement | null> | null
  setFileSchema: (schema: RJSFSchema | null) => void
  setFileUiSchema: (uischema: UiSchema | null) => void
  setFormData: (FormData: Record<string, any>) => void
  setIsLoading: (isLoading: boolean) => void
  resetSchema: () => void
  setAutoSaveLoading: (isSaving: boolean) => void
  setPrintRef: (ref: RefObject<HTMLDivElement | null> | null) => void
}

const useReadDocument = create<ReadDocumentInterface>((set) => ({
  uiSchema: null,
  schema: null,
  formData: {},
  isLoading: false,
  isSaving: false,
  printRef: null,
  setFileSchema: (schema) => set({ schema }),
  setFileUiSchema: (uiSchema) => set({ uiSchema }),
  setFormData: (formData) => set({ formData }),
  setIsLoading: (isLoading) => set({ isLoading }),
  resetSchema: () => set({
    isLoading: false,
    isSaving: false,
    uiSchema: null,
    schema: null,
    formData: {}
  }),
  setAutoSaveLoading: (isSaving) => set({ isSaving }),
  setPrintRef: (printRef) => set({ printRef }),

}))


export default useReadDocument





