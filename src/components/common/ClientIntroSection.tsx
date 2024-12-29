"use client";
import React from "react";
import { usePathname } from "next/navigation";
import "@/styles/components/FreelanceIntroSection.css";
import "@/styles/components/IntroSection.css";
interface ClientIntroSectionProps {
  firstTitle: string;
  undertitle?: string;
  image?: string;
}

const ClientIntroSection: React.FC<ClientIntroSectionProps> = ({
  firstTitle,
  undertitle,
}) => {
  const path = usePathname();
  let pathImage = "";
  let pathImageMobile = "";

  if (path == "/client") {
    pathImage = "/clientAccueil.svg";
    pathImageMobile = "/espaceClientTel.svg";
  } else if (path.startsWith("/client/ao")) {
    pathImage = "/clientAO.svg";
    pathImageMobile = "/clientAOTel.svg";
  } else if (path.startsWith("/client/missions")) {
    pathImage = "/clientMission.svg";
    pathImageMobile = "/clientMissionTel.svg";
  } else if (path.startsWith("/client/documents")) {
    pathImage = "/clientOfficialDocuments.svg";
    pathImageMobile = "/clientDocumentsTel.svg";
  }

  return (
    <div>
      <div className="display-computer-tablet">
        <div className="flex justify-center relative">
          <img src={pathImage} alt="banner connect"></img>
          <div className="text-container">
            <h1 className="header-title-intro-section-text-indep">{firstTitle}</h1>
            <h5 className="undertitle-text w-8/12 mt-10 md:mt-0">{undertitle}</h5>
          </div>
        </div>
      </div>

      <div className="display-mobile">
        <img src={pathImageMobile} alt="banner connect"></img>
      </div>
    </div>
  );
};

export default ClientIntroSection;
