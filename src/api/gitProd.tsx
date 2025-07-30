import { apiClient } from "@_/assets/config/baseUrl";
import type { CEGit } from "@_/types/gitProd";
import { useTokenStore } from "@_/stores/useTokenStore";
import { File64base } from "@_/hooks/file64Base";

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

export const gitProdCreate = async (data: CEGit) => {
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
    data.planguages.forEach((language: string) => {
      formData.append("pLanguages", language);
    });
    data.tools.forEach((tool: string) => {
      formData.append("tools", tool);
    });

    data.images.forEach((image: any) => {
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

export const gitProdUpdate = async (project_id: string, data: CEGit) => {
  if (!project_id) {
    throw new Error("Project ID is required for update");
  }
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
    data.planguages.forEach((language: string) => {
      formData.append("pLanguages", language);
    });
    data.tools.forEach((tool: string) => {
      formData.append("tools", tool);
    });

    data.images.forEach((image) => {
      if (typeof image === "string") {
        const blob = File64base(image, `image_${Date.now()}.png`, "image/png");
        formData.append("img", blob);
      }
    });

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    };

    const response = await apiClient.patch(
      `git-projects/patch/${project_id}`,
      formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating gitProd with id ${project_id}:`, error);
    throw new Error(`Failed to update gitProd data for id ${project_id}`);
  }
};

export const gitProdDelete = async (project_id: string) => {
  console.log("gitProdDelete called with project_id:", project_id);
  if (!project_id) {
    throw new Error("Project ID is required for deletion");
  }
  const token = useTokenStore.getState().token;
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    const response = await apiClient.delete(
      `git-projects/delete/${project_id}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error Deleting GitProd with id ${project_id}:`, error);
    throw new Error(`Failed to delete gitProd data for id ${project_id}`);
  }
};

export const removeImage = async (project_id: string, public_id: string) => {
  if (!project_id || !public_id) {
    throw new Error("Project ID and Public ID are required for deletion");
  }
  const token = useTokenStore.getState().token;
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };

    const response = await apiClient.patch(
      `git-projects/remove-images/${project_id}`,
      { public_id },
      { headers }
    );
    return response.data;

  } catch (error) {
    console.error(`Error Deleting GitProd with id ${project_id}:`, error);
    throw new Error(`Failed to delete gitProd data for id ${project_id}`);
  }
};