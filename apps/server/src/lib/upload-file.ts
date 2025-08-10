import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadFile = async (file: File, type: "quiz" | "note") => {
  try {
    const uuid = crypto.randomUUID();
    const fileName = `${type}-${uuid}-${file.name}`;

    const newFile = new File([file], fileName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const uploadResponse = await utapi.uploadFiles(newFile);

    if (!uploadResponse.data) {
      throw new Error("No data returned from upload");
    }

    const docLink = uploadResponse.data.ufsUrl;
    return docLink;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};
