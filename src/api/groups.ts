import type { Form } from "./forms"
import { unWrap } from "./helpers"
import { axiosClient } from "./queryClient"


export interface Group {
  id: string,
  name: string,
  forms: Array<Form>,
  timeCreated: string,
  timeUpdated: string
}


export const getGroups = async (): Promise<Group[]> => {
  try {
    return await unWrap(axiosClient.get("/group"))
  }
  catch (error) {
    throw error
  }
}

export const postGroup = async (name: string) => {
  try {
    return await unWrap(axiosClient.post("/group", { name }))
  }
  catch (error) {
    throw error
  }
}

export const getGroup = async (id: string) => {
  try {
    return await unWrap(axiosClient.get(`/group/${id}`))
  } catch (error) {
    throw error
  }
}

export const putGroup = async ({ id, name }: { id: string, name: string }): Promise<Group> => {
  try {
    return await unWrap(axiosClient.put(`/group/${id}`, { name }))
  }
  catch (error) {
    throw error
  }
}

export const deleteGroup = async (id: string): Promise<void> => {
  try {
    return await unWrap(axiosClient.delete(`/group/${id}`))
  } catch (error) {
    throw error
  }
}

