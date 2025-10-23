import { unWrap } from "./helpers"
import { axiosClient } from "./queryClient"

export interface FormVersion {
  id: string
  name: string
  groupID: string
  version: number,
  data: {
    propertyName: string
  }
  timeCreated: string,
  timeUpdated: string

}



export const getFormVersion = async (formID: string): Promise<FormVersion[]> => {
  try {
    return unWrap(axiosClient.get(`/form/${formID}/version`))
  }
  catch (error) {
    throw error
  }
}

export type formVersionType = {
  formID: string;
  sourceVersion: number;
  name?: string;
}

export const postFormVersion = async ({
  formID,
  sourceVersion,
  name,
}: formVersionType): Promise<FormVersion> => {
  try {
    return await unWrap(
      axiosClient.post(`/form/${formID}/version`, {
        sourceVersion,
        name,
      })
    );
  } catch (error) {
    throw error;
  }
};

export type formVersionNumberType = {
  formID: string,
  versionNumber: string
}

export const getFindVersionNumber = async ({ formID, versionNumber }: formVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrap(axiosClient.get(`/form/${formID}/version/${versionNumber}`))
  }
  catch (error) {
    throw error;
  }
}

export type putVersionNumberType = {
  formID: string,
  versionNumber: number,
  name?: FormVersion["name"]
  data: FormVersion["data"]
}

export const putVersionNumber = async ({ formID, versionNumber, name, data }: putVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrap(axiosClient.put(`/form/${formID}/version/${versionNumber}`, { name, data }))
  }
  catch (error) {
    throw error;
  }
}

export type putPublishVersionNumberType = {
  formID: string,
  versionNumber: number
}
export const putPublishVersionNumber = async ({ formID, versionNumber }: putPublishVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrap(axiosClient.get(`/form/${formID}/version/${versionNumber}/publish`))
  }
  catch (error) {
    throw error;
  }
}


