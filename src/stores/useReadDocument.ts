import { create } from "zustand"
import type { RJSFSchema, UiSchema } from "@rjsf/utils"

interface ReadDocumentInterface {
  schema: RJSFSchema | null
  uiSchema: UiSchema | null
  formData: Record<string, any>
  isLoading: boolean
  setFileSchema: (schema: RJSFSchema | null) => void
  setFileUiSchema: (uischema: UiSchema | null) => void
  setFormData: (FormData: Record<string, any>) => void
  setIsLoading: (isLoading: boolean) => void
}

const useReadDocument = create<ReadDocumentInterface>((set) => ({
  uiSchema: null,
  schema: null,
  formData: {},
  isLoading: false,
  setFileSchema: (schema) => set({ schema }),
  setFileUiSchema: (uiSchema) => set({ uiSchema }),
  setFormData: (formData) => set({ formData }),
  setIsLoading: (isLoading) => set({ isLoading }),

}))


export default useReadDocument





