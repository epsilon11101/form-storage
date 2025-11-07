import { gitlabClient } from "./queryClient"

export interface GITLAB {
  token: string,
  path: string,
  initialDate: string,
  endDate: string
}
export type GitlabContentType = {
  id: string;
  title: string;
  description: string;
  milestone: {
    id: string;
    title: string;
  }
};



export const getGitlabIssues = async (
  token: string,
  path: string,
  initialDate: string,
  endDate: string
): Promise<GitlabContentType[]> => {
  try {
    const encodedPath = encodeURIComponent(path);
    const { data: project } = await gitlabClient.get(`/projects/${encodedPath}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data: issues } = await gitlabClient.get(`/projects/${project.id}/issues`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        created_after: initialDate,
        created_before: endDate,
        per_page: 100,
        order_by: "created_at",
        sort: "asc",
      },
    });

    return issues;
  } catch (error) {
    console.error("Error fetching GitLab issues:", error);
    throw error;
  }
};
