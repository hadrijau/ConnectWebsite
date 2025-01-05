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
    pathImageMobile = "/imgFreelanceMobileAccueil.svg";
  } else if (path.startsWith("/freelance/entreprise")) {
    pathImage = "/freelanceMyEnterprise.svg";
    pathImageMobile = "/imgFreelanceMobileEnterprise.svg";
  } else if (path.startsWith("/freelance/missions")) {
    pathImage = "/freelanceMissions.svg";
    pathImageMobile = "/imgFreelanceMobileMission.svg";
  } else if (path.startsWith("/freelance/documents")) {
    pathImage = "/freelanceOfficialDocuments.svg";
    pathImageMobile = "/imgFreelanceMobileOfficialDocuments.svg";
  } else if (path.startsWith("/freelance/ao")) {
    pathImage = "/freelanceAO.svg";
    pathImageMobile = "/imgFreelanceMobileAccueil.svg";
  }

  return (
    <div>
      <div className="display-computer-tablet">
        <div className="flex justify-center relative">
          <img src={pathImage} alt="banner connect"></img>
          <div className="text-container">
            <h1 className="header-title-intro-section-text-indep">{firstTitle}</h1>
            <h5 className="undertitle-text w-8/12 mt-10 md:mt-0">{undertitle}</h5>
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
