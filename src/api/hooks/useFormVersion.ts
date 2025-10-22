import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getFormVersion,
  getFindVersionNumber,
  putVersionNumber,
  postFormVersion,
  type FormVersion,
} from "../formsVersions.ts"
import type { formVersionType, putVersionNumberType } from "../formsVersions"



export const formVersionKeys = {
  all: ["formVersion"] as const,
  list: (formID: string) => [...formVersionKeys.all, formID, "list"] as const,
  detail: (formID: string, versionNumber: string | number) =>
    [...formVersionKeys.all, formID, "detail", versionNumber] as const,
  published: (formID: string, versionNumber: string | number) =>
    [...formVersionKeys.all, formID, "published", versionNumber] as const,
}

export const useFormVersions = (formID: string) => {
  return useQuery<FormVersion[], Error>({
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
  return useMutation<FormVersion, Error, formVersionType>({
    mutationFn: postFormVersion,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: formVersionKeys.list(variables.formID),
      })
    },
  })
}


export const useUpdateFormVersion = () => {
  const queryClient = useQueryClient()
  return useMutation<FormVersion, Error, putVersionNumberType>({
    mutationFn: putVersionNumber,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: formVersionKeys.detail(
          variables.formID,
          variables.versionNumber
        ),
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
