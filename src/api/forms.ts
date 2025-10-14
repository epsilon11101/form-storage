import { unWrap } from "./helpers"
import { axiosClient } from "./queryClient"

export interface Form {
  id: string
  name: string
  groupID: string
  data: {
    propertyName: string
  }
  currentVersion: number,
  timeCreated: string,
  timeUpdated: string
}

type putFormBodyType = {
  formID: string,
} & Pick<Form, 'groupID' | 'name' | 'data'>;

type postFormBodyType = Omit<putFormBodyType, 'formID'>



export const getForm = async (formID: string): Promise<Form> => {
  try {
    return await unWrap(axiosClient.get(`/form/${formID}`))
  }
  catch (error) {
    throw error
  }
}


export const putForm = async ({ formID, groupID, name, data }: putFormBodyType): Promise<Form> => {
  try {
    return await unWrap(axiosClient.put(`/form/${formID}`, { groupID, name, data }))
  }
  catch (error) {
    throw error
  }
}

export const delForm = async (formID: string): Promise<Form> => {
  try {
    return await unWrap(axiosClient.delete(`/form/${formID}`))
  }
  catch (error) {
    throw error
  }
}

export const postForm = async (body: postFormBodyType): Promise<Form> => {
  try {
    return await unWrap(axiosClient.post("/form", body))
  }
  catch (error) {
    throw error
  }
}






