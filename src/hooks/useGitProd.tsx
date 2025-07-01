import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@_/api/gitProd";

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
