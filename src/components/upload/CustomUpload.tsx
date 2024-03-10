import React, { useState, ChangeEvent, useRef, ReactNode } from "react";
import { storage } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

interface CustomUploadProps {
  setDownloadUrl: React.Dispatch<React.SetStateAction<string>>;
  children?: ReactNode;
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  setDownloadUrl,
  children
}) => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      handleUpload(image);
    }
  };

  const handleUpload = (image: File) => {
    if (image) {
      const storageRef = ref(storage, `cv/${image.name}`);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          const downloadUrl = await getDownloadURL(storageRef);
          setDownloadUrl(downloadUrl);
          console.log("Upload completed");
        }
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        ref={(input) => (fileInputRef.current = input)}
      />
      <div onClick={handleClick}>   
            {children}
      </div>
    </div>
  );
};

export default CustomUpload;
