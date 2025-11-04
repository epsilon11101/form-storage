import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getFormVersion,
  getFindVersionNumber,
  putVersionNumber,
  postFormVersion,
  type FormVersion,
  deleteVersion,
} from "../formsVersions.ts"
import type { deleteVersionType, formVersionType, putVersionNumberType, Version } from "../formsVersions"
import { formQueryKeys } from "./useForms.ts"



export const formVersionKeys = {
  all: ["formVersion"] as const,
  list: (formID: string) => [...formVersionKeys.all, formID, "list"] as const,
  detail: (formID: string, versionNumber: string | number) =>
    [...formVersionKeys.all, formID, "detail", versionNumber] as const,
  published: (formID: string, versionNumber: string | number) =>
    [...formVersionKeys.all, formID, "published", versionNumber] as const,
}

export const useFormVersions = (formID: string) => {
  return useQuery<FormVersion, Error>({
    queryKey: formVersionKeys.list(formID),
    queryFn: () => getFormVersion(formID),
    enabled: !!formID,
  })
}
export const useFormVersionDetail = (formID: string, versionNumber: string) => {
  return useQuery<FormVersion, Error>({
    queryKey: formVersionKeys.detail(formID, versionNumber),
    queryFn: () => getFindVersionNumber({ formID, versionNumber }),
    enabled: !!formID && !!versionNumber,
  })
}

export const useCreateFormVersion = () => {
  const queryClient = useQueryClient()

  return useMutation<Version, Error, formVersionType>({
    mutationFn: postFormVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formVersionKeys.all })
    },
  })
}
export const useUpdateFormVersion = () => {
  const queryClient = useQueryClient()
  return useMutation<Version, Error, putVersionNumberType>({
    mutationFn: putVersionNumber,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: formVersionKeys.all })
    ,
  })
}

export const useDeleteFormVersion = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, deleteVersionType>({
    mutationFn: deleteVersion,
    onSuccess: (_, variables) => {

      queryClient.invalidateQueries({
        queryKey: formVersionKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: formQueryKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: formQueryKeys.detail(variables.formID),
      })
    },
  })
}


// export const usePublishFormVersion = () => {
//   const queryClient = useQueryClient()
//   return useMutation<FormVersion, Error, putPublishVersionNumberType>({
//     mutationFn: putPublishVersionNumber,
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: formVersionKeys.published(
//           variables.formID,
//           variables.versionNumber
//         ),
//       })
//     },
//   })
// }
