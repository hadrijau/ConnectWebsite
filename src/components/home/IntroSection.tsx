"use client";
import React from "react";
import Button from "@/components/common/Button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/styles/components/IntroSection.css";

interface IntroSectionProps {
  firstTitle: string;
  secondTitle: string;
  undertitle: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  firstTitle,
  secondTitle,
  undertitle,
}) => {
  const path = usePathname();
  let pathImage = "";
  let pathImageMobile = "";

  if (path.startsWith("/entreprise")) {
    pathImage = "/imgClient.svg";
    pathImageMobile = "/imgClientTel.svg";
  } else if (path == "/") {
    pathImage = "/imgAccueil.svg";
    pathImageMobile = "/imgAccueilTel.svg";
  } else if (path.startsWith("/histoire")) {
    pathImage = "/imgHistoire.svg";
    pathImageMobile = "/imgHistoireTel.svg";
  } else if (path.startsWith("/independant")) {
    pathImage = "/imgIndependant.svg";
    pathImageMobile = "/imgIndependantTel.svg";
  } else if (path.startsWith("/metiers")) {
    pathImage = "/imgMetiers.svg";
    pathImageMobile = "/imgMetiersTel.svg";
  } else if (path.startsWith("/portage")) {
    pathImage = "/imgPortage.svg";
    pathImageMobile = "/imgPortageTel.svg";
  }

  return (
    <div>
      <div className="display-computer">
        <div className="flex justify-center relative">
          <img
            src={pathImage}
            alt="banner connect"
          ></img>
          <div className="text-container">
            <h1 className="header-title-intro-section-text text-white">
              {firstTitle} <br /> {secondTitle} <br />
            </h1>
            <h5
              className={
                path.startsWith("/independant") ||
                path.startsWith("/entreprise")
                  ? "undertitle-text my-4 text-white md:my-2"
                  : "undertitle-text my-6 text-white md:my-4"
              }
            >
              {undertitle}
            </h5>

            {path.startsWith("/independant") ||
            path.startsWith("/entreprise") ? (
              <div className="flex items-center">
                <div className="flex ml-5 mt-6 lg:mt-2">
                  <Image
                    src="googlePlay.svg"
                    alt="Google Play"
                    className="mr-10"
                    width={140}
                    height={66}
                  />
                  <Image
                    src="iosStore.svg"
                    alt="IOS Store"
                    width={150}
                    height={80}
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-12/12 lg:w-10/12">
                <Button
                  title="Entreprise"
                  href="/entreprise"
                  background="#D892C0"
                  borderColor="#D892C0"
                  newBackground="none"
                  className="mr-2"
                ></Button>
                <Button
                  title="Indépendant"
                  href="/independant"
                  background="none"
                  borderColor="#B9D386"
                  newBackground="#B9D386"
                  className="empty-button mx-2"
                ></Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="display-mobile">
      <img
            src={pathImageMobile}
            alt="banner connect"
          ></img>
      </div>
    </div>
  );
};

export default IntroSection;
