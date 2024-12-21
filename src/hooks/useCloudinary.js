import { useState } from "react";

export const useCloudinary = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToCloudinary = async (files) => {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/raw/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed for file: ${file.name}`);
        }

        const data = await response.json();
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      setIsUploading(false);
      return urls;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  return { uploadToCloudinary, isUploading };
};
