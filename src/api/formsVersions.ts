import { unWrap } from "./helpers"
import { axiosClient } from "./queryClient"


export interface Version {
  id: string,
  formID: string,
  version: number,
  name: string,
  data: {
    propertyName: string
  },
  timeCreated: string,
  timeUpdated: string,
}

export interface FormVersion {
  id: string
  name: string
  groupID: string
  currentVersion: string,
  versions: Version[]

}



export const getFormVersion = async (formID: string): Promise<FormVersion> => {
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
}: formVersionType): Promise<Version> => {
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
  data?: Version["data"]
  setCurrentVersion?: boolean
}

export const putVersionNumber = async ({ formID, versionNumber, name, data, setCurrentVersion }: putVersionNumberType): Promise<Version> => {
  try {
    return await unWrap(axiosClient.put(`/form/${formID}/version/${versionNumber}`, { name, data, setCurrentVersion }))
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

export type deleteVersionType = {
  formID: string
  versionNumber: number
}

export const deleteVersion = async ({ formID, versionNumber }: deleteVersionType): Promise<void> => {
  try {
    await unWrap(axiosClient.delete(`/form/${formID}/version/${versionNumber}`))
  } catch (error) {
    throw error
  }
}
