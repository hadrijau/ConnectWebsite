"use client";
import React from "react";
import { usePathname } from "next/navigation";
import "@/styles/components/FreelanceIntroSection.css";
import "@/styles/components/IntroSection.css";
interface FreelanceIntroSectionProps {
  firstTitle: string;
  undertitle?: string;
  subtitle?: string;
}

const FreelanceIntroSection: React.FC<FreelanceIntroSectionProps> = ({
  firstTitle,
  undertitle,
  subtitle
}) => {
  const path = usePathname();
  let pathImage = "";
  let pathImageMobile = "";
  
  
  if (path == ("/freelance")) {
    pathImage = "/freelanceAccueil.svg";
    pathImageMobile = "/imgfreelanceTel.svg";
  } else if (path.startsWith("/freelance/entreprise")) {
    pathImage = "/freelanceMyEnterprise.svg";
    pathImageMobile = "/imgAccueilTel.svg";
  } else if (path.startsWith("/freelance/missions")) {
    pathImage = "/freelanceMissions.svg";
    pathImageMobile = "/imgHistoireTel.svg";
  } else if (path.startsWith("/freelance/documents")) {
    pathImage = "/freelanceOfficialDocuments.svg";
    pathImageMobile = "/imgIndependantTel.svg";
  } else if (path.startsWith("/freelance/ao")) {
    pathImage = "/freelanceAO.svg";
    pathImageMobile = "/imgAccueilTel.svg";
  }

  return (
    <div>
      <div className="display-computer">
        <div className="flex justify-center relative">
          <img src={pathImage} alt="banner connect"></img>
          <div className="text-container">
            <h1 className="header-title-intro-section-text-indep">{firstTitle}</h1>
            <h5 className="undertitle-text mt-10">{undertitle}</h5>
            <h5 className="undertitle-text ">{subtitle}</h5>

          </div>
        </div>
      </div>

      <div className="display-mobile">
        <img src={pathImageMobile} alt="banner connect"></img>
      </div>
    </div>
  );
};

export default FreelanceIntroSection;
