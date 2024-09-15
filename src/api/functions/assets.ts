import { axiosClient } from "@/lib/axios";
import { URLs } from "../URLs";

export const uploadImageToServer = async ({
  projectId,
  file,
}: {
  projectId: string;
  file: File;
}) => {
  const form = new FormData();
  form.append("file", file);
  form.append("projectId", projectId);
  const response = await axiosClient.post(URLs.ASSETS_UPLOAD, form);

  return response.data;
};
