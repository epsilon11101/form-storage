import type { RJSFSchema, UiSchema } from "@rjsf/utils"

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Error al leer el archivo'))
    reader.readAsText(file)
  })
}

export const parseSchemaString = (
  jsonString: string
): { schema: RJSFSchema | null; uiSchema: UiSchema | null } => {
  try {
    const parsed = JSON.parse(jsonString)

    return {
      schema: parsed.schema ?? parsed ?? null,
      uiSchema: parsed.uiSchema ?? null,
    }
  } catch (error) {
    console.error("ERROR AL PARSEAR EL SCHEMA:", error)
    return {
      schema: null,
      uiSchema: null,
    }
  }
}
