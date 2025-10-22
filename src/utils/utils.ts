import type { RJSFSchema, UiSchema } from "@rjsf/utils"

export const readFileAsText = (file: File): Promise<{ name: string; fileContent: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        fileContent: reader.result as string,
      });
    };

    reader.onerror = () => reject(new Error("Error al leer el archivo"));
    reader.readAsText(file);
  });
};


export const parseSchemaString = (
  jsonString: string
): {
  schema: RJSFSchema | null
  uiSchema: UiSchema | null
  formData: Record<string, any> | null
  hasError: boolean
} => {
  try {
    const parsed = JSON.parse(jsonString)


    const hasSchema = typeof parsed.schema === "object"
    const hasUiSchema = typeof parsed.uiSchema === "object"
    const hasFormData = typeof parsed.formData === "object"


    if (!hasSchema || !hasUiSchema || !hasFormData) {
      console.warn("Formato inválido: falta schema o uiSchema")
      return {
        schema: null,
        uiSchema: null,
        formData: null,
        hasError: true,
      }
    }

    return {
      schema: parsed.schema,
      uiSchema: parsed.uiSchema,
      formData: parsed.formData,
      hasError: false,
    }
  } catch (error) {
    console.error("ERROR AL PARSEAR EL SCHEMA:", error)
    return {
      schema: null,
      uiSchema: null,
      formData: null,
      hasError: true,
    }
  }
}


export const stringifyCode = (schema: UiSchema | RJSFSchema | Record<string, any> | null) => {
  if (!schema) return undefined

  return JSON.stringify(schema, null, 2)
}

