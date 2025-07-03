import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { getToken, gitProdCreate } from "@_/api/gitProd";
import type { getGitProd } from "@_/types/gitProd";
import { useTokenStore } from "@_/stores/useTokenStore";
import { apiClient } from "@_/assets/config/baseUrl";

export const useGetToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ keyId }: { keyId: string }) => {
      const response = await getToken({ Key_ID: keyId });
      return response?.Token?.tag;
    },

    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(["token"], data);
      }
    },

    onError: (error) => {
      console.error("Error fetching token:", error);
    },
  });
};

export const useGitProdCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: getGitProd }) => {
      const response = await gitProdCreate(data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gitProd"] });
    },
    onError: (err) => {
      console.error("Error creating gitProd:", err);
    },
  });
};

export const useGitProd = (category?: string, page: number = 1) => {
  console.log("useGitProd called with category:", category, "and page:", page);
  const token = useTokenStore.getState().token;

  return useQuery({
    queryKey: ["gitProd", category, page],
    queryFn: async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get(
          `git-projects?${category ? `&category=${category}` : ""}`,
          { headers }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching gitProd:", error);
        throw new Error("Failed to fetch gitProd data");
      }
    },
  });
};
