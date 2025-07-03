import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@_/assets/config/baseUrl";
import type { gitProd } from "@_/types/gitProd";
import { useTokenStore } from "@_/stores/useTokenStore";
import { File64base } from "@_/hooks/file64Base";

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

export const gitProdCreate = async (data: gitProd) => {
  const token = useTokenStore.getState().token;

  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("gitUrl", data.gitUrl);
    formData.append("category", data.category);
    formData.append("favorite", data.favorite);
    data.features.forEach((feature: string) => {
      formData.append("features", feature);
    });
    data.pLanguages.forEach((language: string) => {
      formData.append("pLanguages", language);
    });
    data.tools.forEach((tool: string) => {
      formData.append("tools", tool);
    });

    data.images.forEach((image: string) => {
      const blob = File64base(image, `image_${Date.now()}.png`, "image/png");
      formData.append("img", blob);
    });
    
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    };

    const response = await apiClient.post("git-projects/create", formData, {
      headers,

    });
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
