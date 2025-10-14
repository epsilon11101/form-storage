import { unWrapWithData } from "./helpers"
import { axiosClient } from "./queryClient"

export interface FormVersion {
  data: {
    id: string
    name: string
    groupID: string
    data: {
      propertyName: string
    }
  }
  isPublished: boolean
  timeCreated: string,
  timeUpdated: string
}



export const getFormVersion = async (formID: string): Promise<FormVersion[]> => {
  try {
    return unWrapWithData(axiosClient.get(`/form${formID}/version`))
  }
  catch (error) {
    throw error
  }
}

type formVersionType = {
  formID: string;
  sourceVersion: number;
  name: string;
}

export const postFormVersion = async ({
  formID,
  sourceVersion,
  name,
}: formVersionType): Promise<FormVersion> => {
  try {
    return await unWrapWithData(
      axiosClient.post(`/form${formID}/version`, {
        sourceVersion,
        name,
      })
    );
  } catch (error) {
    throw error;
  }
};

type formVersionNumberType = {
  formID: string,
  versionNumber: string
}

export const getFindVersionNumber = async ({ formID, versionNumber }: formVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrapWithData(axiosClient.get(`/form${formID}/version/${versionNumber}`))
  }
  catch (error) {
    throw error;
  }
}

type putVersionNumberType = {
  formID: string,
  versionNumber: number,
  name: FormVersion["data"]["name"]
  data: FormVersion["data"]["data"]
}

export const putVersionNumber = async ({ formID, versionNumber, name, data }: putVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrapWithData(axiosClient.put(`/form/${formID}/version/${versionNumber}`, { name, data }))
  }
  catch (error) {
    throw error;
  }
}

type putPublishVersionNumberType = {
  formID: string,
  versionNumber: number
}
export const putPublishVersionNumber = async ({ formID, versionNumber }: putPublishVersionNumberType): Promise<FormVersion> => {
  try {
    return await unWrapWithData(axiosClient.get(`/form/${formID}/version/${versionNumber}/publish`))
  }
  catch (error) {
    throw error;
  }
}


