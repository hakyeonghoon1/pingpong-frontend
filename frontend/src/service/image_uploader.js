import axios from "axios";

class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pdzaoz52");

    let response;

    const result = await axios
      .post("/api/file/upload", data, {
        //회원정보 수정 부분
        headers: {
          "content-type": "multipart/form-data",
        },
        body: data,
      })
      .then((res) => {
        console.log(res.data);
        response = res.data;
      });

    return response;
  }
}

export default ImageUploader;
