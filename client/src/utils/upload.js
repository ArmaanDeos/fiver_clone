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
    // console.log(res.data);
    const { secure_url } = res.data;
    // console.log(secure_url);
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default upload;
