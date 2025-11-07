import { useGetGroups } from "@/api/hooks/useGroups"
import TList from "../ui/list/TList"
import type { FolderStructureType } from "../ui/list/types"
import { useMemo } from "react"
import { TProgress } from "../ui/TProgress"
import { usePathName } from "@/hooks/usePathName"




export const DrawerContent = () => {
  const { hidden } = usePathName()
  if (!hidden) return <DrawerContentGitlab />

  const { data, isPending } = useGetGroups()

  const fetchedData = useMemo(() => {
    if (!data) return []

    return data.reduce((acc, group) => {
      const { forms, name, id } = group
      acc.push({
        id,
        parent_name: name,
        children: forms?.map((form) => ({
          name: form.name,
          id: form.id,
        })),
      })
      return acc
    }, [] as FolderStructureType)
  }, [data])


  return <TProgress isLoading={isPending}>
    <TList jsonFolders={fetchedData} />
  </TProgress>

}

const DrawerContentGitlab = () => {
  return null
}

//
// jsonFolders={[
//    {
//      parent_name: "(LOTIFICACIÓN)PROTOCOLIZACIÓN",
//      children: [{ name: "JsonDocumentos" }, { name: "JsonNormal" }],
//    },
//    {
//      parent_name: "RootFolder2",
//      children: [{ name: "ChildA" }, { name: "ChildB" }],
//    },
//  ]}
