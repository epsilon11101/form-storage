import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { deleteGroup, getGroup, getGroups, postGroup, putGroup, type Group } from "../groups.ts";

const groupQueryKeys = {
  all: ["groups"] as const,
  lists: () => [...groupQueryKeys.all, "list"] as const,
  list: (filters?: string) => [...groupQueryKeys.lists(), { filters }] as const,
  details: () => [...groupQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...groupQueryKeys.details(), id] as const,
};


type GroupsResponse = { data: Group[] }


export const useGetGroups = () => {
  return useSuspenseQuery<GroupsResponse>({
    queryKey: groupQueryKeys.all,
    queryFn: getGroups,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postGroup,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all }),
  });
};

export const useGetGroup = (id: string | undefined) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(id ?? "unknown"),
    queryFn: () => getGroup(id as string),
    enabled: !!id,
  });
};

export const useEditGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(variables.id) });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
    }
  })
}
