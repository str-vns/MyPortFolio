import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getToken } from "@_/api/gitProd";
import type { getGitProd } from "@_/types/gitProd";
import { useTokenStore } from "@_/stores/useTokenStore";
import { apiClient } from "@_/assets/config/baseUrl";

export const useEducation = () => {
  const token = useTokenStore.getState().token;

  return useQuery({
    queryKey: ["Educ"],
    queryFn: async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get("education", { header });
        return response.data;
      } catch (error) {
        console.log("Error Fetch Education", error);
        throw new Error("Error Fetch Education");
      }
    },
  });
};

export const useExperience = () => {
  const token = useTokenStore.getState().token;
  return useQuery({
    queryKey: ["Exp"],
    queryFn: async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get("experience", { header });
        return response.data;
      } catch (error) {
        console.log("Error Fetch Experience", error);
        throw new Error("Error Fetch Experience");
      }
    },
  });
};
