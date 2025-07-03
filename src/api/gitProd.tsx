import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@_/assets/config/baseUrl";
import type { gitProd } from "@_/types/gitProd";
import { useTokenStore } from "@_/stores/useTokenStore";

export const useGitProd = () => {
  const token = useTokenStore.getState().token

  return useQuery({
    queryKey: ["gitProd"],
    queryFn: async () => {
      try {
        
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await apiClient.get("git-projects", { headers });
        return response.data;
      } catch (error) {
        console.error("Error fetching gitProd:", error);
        throw new Error("Failed to fetch gitProd data");
      }
    },
  });
};

export const useGitProdById = (id: string) => {
  return useQuery({
    queryKey: ["gitProd", id],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`git-projects/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching gitProd with id ${id}:`, error);
        throw new Error(`Failed to fetch gitProd data for id ${id}`);
      }
    },
  });
};

export const getToken = async ({ Key_ID }: { Key_ID: string }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await apiClient.post(
      `git-projects/secret/`,
      { Key_ID },
      { headers }
    );

    if (response.data && response.data.Token) {
      useTokenStore.getState().setToken(response.data.Token.tag);
      useTokenStore.getState().setAuthenticated(true);
    } else {
      throw new Error("Token not found in response");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to fetch token");
  }
};

export const useGitProdCreate = async (data: gitProd) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${process.env.DOWNTOKEN}`,
    };

    const response = await apiClient.post("/gitProd", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating gitProd:", error);
    throw new Error("Failed to create gitProd data");
  }
};

export const useGitProdUpdate = async (id: string, data: gitProd) => {
  try {
    const headers = {
      "Conteny-Type": "multipart/form-data",
      Authorization: `Bearer`,
    };

    const response = await apiClient.patch(`/git-projects/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating gitProd with id ${id}:`, error);
    throw new Error(`Failed to update gitProd data for id ${id}`);
  }
};

export const useGitProdDelete = async (id: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DOWNTOKEN}`,
    };

    const response = await apiClient.delete(`/git-projects/${id}`, "", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error Deleting GitPProd with id ${id}:`, error);
    throw new Error(`Failed to delete gitProd data for id ${id}`);
  }
};
