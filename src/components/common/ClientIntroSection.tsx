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
    pathImageMobile = "/imgClientTel.svg";
  } else if (path == "/client/ao") {
    pathImage = "/clientAO.svg";
    pathImageMobile = "/imgAccueilTel.svg";
  } else if (path.startsWith("/client/missions")) {
    pathImage = "/clientMission.svg";
    pathImageMobile = "/imgHistoireTel.svg";
  } else if (path.startsWith("/client/documents")) {
    pathImage = "/clientOfficialDocuments.svg";
    pathImageMobile = "/imgIndependantTel.svg";
  } else if (path.startsWith("/client/create-ao")) {
    pathImage = "/clientCreateAO.svg";
    pathImageMobile = "/imgIndependantTel.svg";
  }

  return (
    <div>
      <div className="display-computer">
        <div className="flex justify-center relative">
          <img src={pathImage} alt="banner connect"></img>
          <div className="text-container">
            <h1 className="header-title-intro-section-text-indep">{firstTitle}</h1>
            <h5 className="undertitle-text w-8/12 mt-10">{undertitle}</h5>
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
