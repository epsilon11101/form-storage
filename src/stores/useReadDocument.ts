import { create } from "zustand"
import type { RJSFSchema, UiSchema } from "@rjsf/utils"

interface ReadDocumentInterface {
  schema: RJSFSchema | null
  uiSchema: UiSchema | null
  formData: Record<string, any>
  setFileSchema: (schema: RJSFSchema) => void
  setFileUiSchema: (uischema: UiSchema) => void
  setFormData: (FormData: Record<string, any>) => void
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
}

const useReadDocument = create<ReadDocumentInterface>((set) => ({
  uiSchema: null,
  schema: null,
  formData: {},
  setFileSchema: (schema) => set({ schema }),
  setFileUiSchema: (uiSchema) => set({ uiSchema }),
  setFormData: (formData) => set({ formData }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}))


export default useReadDocument





