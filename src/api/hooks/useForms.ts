import { useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query"
import { delForm, getForm, postForm, putForm, type Form } from "../forms"
import { groupQueryKeys } from "./useGroups"

export const formQueryKeys = {
  all: ["forms"] as const,
  lists: () => [...formQueryKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...formQueryKeys.lists(), { filters }] as const,
  details: () => [...formQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...formQueryKeys.details(), id] as const,
}

export const useForm = (formID: string): UseQueryResult<Form, Error> =>
  useQuery({
    queryKey: formQueryKeys.detail(formID),
    queryFn: () => getForm(formID),
    enabled: false,
    refetchOnMount: 'always'
  })

export const useCreateForm = (): UseMutationResult<Form, Error, Parameters<typeof postForm>[0]> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all })
    },
  })
}

export const useUpdateForm = (): UseMutationResult<Form, Error, Parameters<typeof putForm>[0]> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: putForm,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.detail(data.id) })
    },
  })
}

export const useDeleteForm = (): UseMutationResult<Form, Error, string> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: delForm,
    onSuccess: (_, formID) => {
      queryClient.invalidateQueries({ queryKey: formQueryKeys.detail(formID) })
      queryClient.invalidateQueries({ queryKey: formQueryKeys.lists() })
    },
  })
}
