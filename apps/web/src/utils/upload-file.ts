import { getStorage } from "@/lib/supabase";

export const uploadFile = async (file: File, userId: string, title: string) => {
  try {
    if (!file) return { error: "File is required" };

    if (!title.trim()) return { error: "Title is required" };
    if (!userId) return { error: "User ID is required" };

    const fileExtension = file.type.split("/")[1];
    const fileName = `${userId}-${title}-${Date.now()}.${fileExtension}`;
    const filePath = `pdf/${fileName}`;

    const storage = getStorage();

    const { data, error: uploadError } = await storage
      .from("pdf")
      .upload(filePath, file);

    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = storage.from("pdf").getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Failed to upload file" };
  }
};
