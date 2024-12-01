import Freelance from "@/entities/freelance";
import React, { useState } from "react";
import CustomUpload from "@/components/upload/CustomUpload";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/Freelance.css";

interface FreelanceProfilPictureUploadProps {
  freelance: Freelance;
}

const FreelanceProfilPictureUpload: React.FC<
  FreelanceProfilPictureUploadProps
> = ({ freelance }) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const router = useRouter();
  const updateFreelance = async (downloadUrl: string) => {
    const updatedFreelance = {
      ...freelance,
      profilePicture: downloadUrl,
    };
    const freelanceInstance = new Freelance(updatedFreelance);
    await freelanceInstance.update();

    router.refresh();
  };

  if (freelance.profilePicture) {
    return (
      <div className="relative">
        <div className="photo-freelance-container">
          <Image
            src={freelance.profilePicture}
            alt="photo de profil"
            fill
            className="rounded-full"
          />
        </div>

        <CustomUpload
          accept="image/png, image/jpeg, image/jpg"
          updateDB={updateFreelance}
          setDownloadUrl={setDownloadUrl}
        >
          <Image
            src="/crayon_indep.svg"
            width={30}
            height={30}
            alt="Modifier photo de profil"
            className="absolute bottom-1 right-1"
          />
        </CustomUpload>
      </div>
    );
  } else {
    return (
      <div>
        <CustomUpload
          setDownloadUrl={setDownloadUrl}
          accept="image/png, image/jpeg, image/jpg"
          updateDB={updateFreelance}
        >
          <Image
            src="/upload_profil.svg"
            width={150}
            height={150}
            alt="Photo de profil"
          />
        </CustomUpload>
      </div>
    );
  }
};

export default FreelanceProfilPictureUpload;
