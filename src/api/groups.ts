import type { Form } from "./forms"
import { axiosClient } from "./queryClient"


export interface Group {
  id: string,
  name: string,
  forms: Array<Form>,
  timeCreated: string,
  timeUpdated: string
}


export const getGroups = async (): Promise<{ data: Group[] }> => {
  try {
    const { data } = await axiosClient.get("/group")
    return data
  }
  catch (error) {
    throw error
  }
}

export const postGroup = async (name: string) => {
  const res = await axiosClient.post("/group", { name })
  return res.data
}

export const getGroup = async (id: string) => {
  const res = await axiosClient.get(`/group/${id}`)
  return res.data;
}

export const putGroup = async ({ id, name }: { id: string, name: string }) => {
  const res = await axiosClient.put(`/group/${id}`, { name })
  return res.data;
}

export const deleteGroup = async (id: string) => {
  const res = await axiosClient.delete(`/group/${id}`)
  return res.data;
}

