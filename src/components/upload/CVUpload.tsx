import Freelance from "@/entities/freelance";
import React, { useState } from "react";
import CustomUpload from "@/components/upload/CustomUpload";
import { useRouter } from "next/navigation";

interface CVUploadProps {
  freelance: Freelance;
}

const CVUpload: React.FC<CVUploadProps> = ({ freelance }) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const router = useRouter();
  const updateFreelance = async (downloadUrl: string) => {
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
  };
  if (freelance.cv) {
    return (
      <div>
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
            Change ton CV
          </div>
        </CustomUpload>

        <a
          className="flex items-center justify-center cursor-pointer"
          href={freelance.cv}
          target="blank"
        >
          <p>Voir mon cv</p>
        </a>
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
