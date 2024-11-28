import axios from "axios";

// Constants
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1eutqjh/image/upload";
const UPLOAD_PRESET = "ml_default";

type ValidFileType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/heif"
  | "image/heic";

// Function to validate file types
const isValidFileType = (fileType: string): fileType is ValidFileType => {
  const validFileTypes: ValidFileType[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/heif",
    "image/heic",
  ];
  return validFileTypes.includes(fileType as ValidFileType);
};

// Main upload function
export const uploadImagesToCloudinary = async (
  selectedFiles: FileList
): Promise<string[]> => {
  const invalidFiles: File[] = Array.from(selectedFiles).filter(
    (file) => !isValidFileType(file.type)
  );

  if (invalidFiles.length > 0) {
    throw new Error(
      "Please upload valid image, PDF, or Word files (JPEG, PNG, GIF, PDF, DOC, DOCX)."
    );
  }

  try {
    const uploadPromises = Array.from(selectedFiles).map((file: File) =>
      uploadFile(file)
    );

    const uploadedImages: string[] = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    throw new Error(
      "Upload failed: An error occurred while uploading your files."
    );
  }
};

// Helper function to upload a single file
const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(
      "Upload failed: An error occurred while uploading your files."
    );
  }
};
