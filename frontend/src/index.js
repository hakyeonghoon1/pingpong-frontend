import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import styles from "./assets/scss/App.scss";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./component/image_file_input/image_file_input";

// const imageUploader = new ImageUploader();
// const FileInput = (props) => (
//   <ImageFileInput {...props} imageUploader={imageUploader} />
// );

render(<App />, document.getElementById("root"));
