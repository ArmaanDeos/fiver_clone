import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr_img");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/armaandev/image/upload",
      data
    );
    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    console.error(
      "Error uploading file to Cloudinary:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to be handled by the calling function
  }
};

export default upload;
