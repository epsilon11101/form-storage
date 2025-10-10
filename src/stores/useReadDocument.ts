import { create } from "zustand"
import type { RJSFSchema, UiSchema } from "@rjsf/utils"

interface ReadDocumentInterface {
  schema: RJSFSchema
  uiSchema: UiSchema
  formData: Record<string, any>
  setFileSchema: (schema: RJSFSchema) => void
  setFileUiSchema: (uischema: UiSchema) => void
  setFormData: (FormData: Record<string, any>) => void
}

const useReadDocument = create<ReadDocumentInterface>((set) => ({
  uiSchema: {},
  schema: {},
  formData: {},
  setFileSchema: (schema) => set({ schema }),
  setFileUiSchema: (uiSchema) => set({ uiSchema }),
  setFormData: (formData) => set({ formData })
}))

export default useReadDocument  
