import {  useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@_/stores/useTokenStore";
import { apiClient } from "@_/assets/config/baseUrl";

export const useEducation = () => {
  const token = useTokenStore.getState().token;

  return useQuery({
    queryKey: ["Educ"],
    queryFn: async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get("education", { headers });
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
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const response = await apiClient.get("experience", { headers });
        return response.data;
      } catch (error) {
        console.log("Error Fetch Experience", error);
        throw new Error("Error Fetch Experience");
      }
    },
  });
};
