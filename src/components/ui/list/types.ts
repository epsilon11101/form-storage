export type FolderStructureType = {
  parent_name: string,
  id: string
  children: {
    id: string
    name: string
  }[]
}[]
