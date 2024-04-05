import { useState } from "react";

export const ImageUpload = (props) => {
  const [image, setImage] = useState("");
  const file = props.e.target.files[0];
  console.log("File, ", file);
  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }

  return (
    <div>
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
    </div>
  );
};

export const VideoUpload = (props) => {
  const [video, setVideo] = useState("");
  const file = props.e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setVideo(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }

  return (
    <div>
      {video && (
        <video controls style={{ maxWidth: "100px", maxHeight: "100px" }}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export const PdfUpload = (props) => {
  const [pdf, setPdf] = useState("");
  const file = props.e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setPdf(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }

  return (
    <div>
      {pdf && (
        <a
          href={pdf}
          download={`${file.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      )}
    </div>
  );
};
