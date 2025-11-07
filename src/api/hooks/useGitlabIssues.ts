import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useGitlab } from "@/stores/useGitlabToken";
import { getGitlabIssues, type GitlabContentType } from "../gitlab";

export const gitlabQueryKeys = {
  all: ["gitlab"] as const,
  issues: (path: string, start: string, end: string) =>
    [...gitlabQueryKeys.all, "issues", path, start, end] as const,
};
export const useGitlabIssues = (): UseQueryResult<GitlabContentType[], Error> => {
  const { token, path, initialDate, endDate } = useGitlab();


  return useQuery<GitlabContentType[], Error>({
    queryKey: gitlabQueryKeys.issues(path, initialDate, endDate),
    queryFn: () => getGitlabIssues(token, path, initialDate, endDate),
    enabled: false, // no se ejecuta automáticamente
    retry: false,   // no reintenta si falla
  });
};
