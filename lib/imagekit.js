export const uploadToImageKit = async (file, fileName) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const response = await fetch("/api/imagekit/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const result = await response.json();

    return {
      success: true,
      data: {
        fileId: result.fileId,
        name: result.name,
        url: result.rul,
        width: result.width,
        height: result.height,
        size: result.size,
      },
    };
  } catch (error) {
    console.error("ImageKit Upload Error", error)
    return{
        success: false,
        error: error.message,
    }
  }
};
