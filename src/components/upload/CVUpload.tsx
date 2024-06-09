import Freelance from "@/entities/freelance";
import React, { useState, useEffect } from "react";
import CustomUpload from "@/components/upload/CustomUpload";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
interface CVUploadProps {
  freelance: Freelance;
}

const CVUpload: React.FC<CVUploadProps> = ({ freelance }) => {
  console.log("free", freelance);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (downloadUrl || freelance.cv) {
      const cvUrl = downloadUrl || freelance.cv;
      const decodedUrl = decodeURIComponent(cvUrl);
      const urlParts = decodedUrl.split("/");
      const filePart = urlParts[urlParts.length - 1];
      const fileName = filePart.split("?")[0]; // Extract file name before query parameters
      setFileName(fileName);
    }
  }, [downloadUrl, freelance.cv]);

  const router = useRouter();
  const updateFreelance = async (downloadUrl: string) => {
    setIsLoading(true)
    const updatedFreelance = new Freelance({
      _id: freelance._id,
      title: freelance.title,
      phone: freelance.phone,
      firstname: freelance.firstname,
      lastname: freelance.lastname,
      email: freelance.email,
      lastMission: freelance.lastMission,
      lengthMissionWanted: freelance.lengthMissionWanted,
      descriptionMissionWanted: freelance.descriptionMissionWanted,
      competences: freelance.competences,
      enterprise: freelance.enterprise,
      profilePicture: freelance.profilePicture,
      experiences: freelance.experiences,
      cv: downloadUrl,
    });
    await updatedFreelance.update();
    router.refresh();
    setIsLoading(false);
  };
  if (isLoading) {
    return <CircularProgress />
  } else if (freelance.cv) {
    return (
      <div className="flex">
        <a
          className="flex items-center justify-center cursor-pointer mr-6"
          href={freelance.cv}
          target="blank"
        >
          <p>{fileName}</p>
        </a>
        <CustomUpload
          accept="application/pdf"
          updateDB={updateFreelance}
          setDownloadUrl={setDownloadUrl}
        >
          <Image
            src="/changeCV.svg"
            width={20}
            height={20}
            alt="Uploader mon CV"
            className="cursor-pointer"
          />
        </CustomUpload>
      </div>
    );
  } else {
    return (
      <div>
        {!downloadUrl ? (
          <CustomUpload
            accept="application/pdf"
            updateDB={updateFreelance}
            setDownloadUrl={setDownloadUrl}
          >
            <div
              title="Sauvegarder"
              className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-normal`}
              style={{ background: "rgba(185, 211, 134, 0.5)" }}
            >
              Télécharge ton CV ici
            </div>
          </CustomUpload>
        ) : (
          <a
            className="flex items-center justify-center cursor-pointer"
            href={downloadUrl}
            target="blank"
          >
            <p>Voir mon cv</p>
          </a>
        )}
      </div>
    );
  }
};

export default CVUpload;
