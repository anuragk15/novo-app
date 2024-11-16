import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const getRecommendations = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const response = await axiosClient
    .get(URLs.RECOMMENDATIONS_GET, {
      params: {
        projectId,
      },
    })
    .catch((error) => {
      throw error;
    });
  return response.data;
};
