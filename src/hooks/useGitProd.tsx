import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken, gitProdCreate } from "@_/api/gitProd";
import type { getGitProd } from "@_/types/gitProd";

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
      console.log("Data to be sent:", data);
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
