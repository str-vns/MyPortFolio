import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getToken,
  gitProdCreate,
  gitProdDelete,
  gitProdUpdate,
  removeImage,
} from "@_/api/gitProd";
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

export const useGitProdSingle = (project_id: string) => {
  const token = useTokenStore.getState().token;

  return useQuery({
    queryKey: ["gitProdSingle", project_id],
    queryFn: async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get(`git-projects/${project_id}`, {
          headers,
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching single gitProd:", error);
        throw new Error("Failed to fetch single gitProd data");
      }
    },
  });
};

export const useGitProdDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project_id: string) => {
      return await gitProdDelete(project_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gitProd"] });
    },
    onError: (err) => {
      console.error("Error deleting gitProd:", err);
    },
  });
};

export const useGitProdUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      project_id,
      data,
    }: {
      project_id: string;
      data: getGitProd;
    }) => {

      const response = await gitProdUpdate(project_id, data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gitProd"] });
    },

    onError: (err) => {
      console.error("Error updating gitProd:", err);
    },
  });
};


export const useRemoveImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      public_id,
    }: {
      project_id: string;
      public_id: string;
    }) => {
      return await removeImage(project_id, public_id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gitProd"] });
    },

    onError: (err) => {
      console.error("Error removing image:", err);
    },
  });
}