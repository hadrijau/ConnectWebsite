"use client";
import React from "react";
import Button from "@/components/common/Button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LongButton from "@/components/common/LongButton";
import "@/styles/components/IntroSection.css";

interface IntroSectionProps {
  firstTitle: string;
  secondTitle: string;
  undertitle: string;
  image: string;
  background: string;
  buttonBackground?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  firstTitle,
  secondTitle,
  undertitle,
  image,
  background,
  buttonBackground,
}) => {
  const path = usePathname();
  let pathImage = ""
  let textContainerClassName = "text-container"
  if (path.startsWith("/histoire")) {
    textContainerClassName = "text-container-histoire"
  } else if (path.startsWith("/independant")) {
    textContainerClassName = "text-container-independant"
  }


  if (path.startsWith("/entreprise")) {
    pathImage = "/imgEntreprise.svg"
  } else if (path == "/") {
    pathImage = "/imgAccueil.svg"
  } else if (path.startsWith("/histoire")) {
    pathImage = "/imgHistoire.svg"
  } else if (path.startsWith("/independant")) {
    pathImage = "/imgIndependant.svg"
  } else if (path.startsWith("/metiers")) {
    pathImage = "/imgMetiers.svg"
  } else if (path.startsWith("/portage")) {
    pathImage = "/imgPortage.svg"
  }


  return (
    <div className="flex justify-center relative">
      <img src={pathImage} alt="banner connect"></img>
      <div className={textContainerClassName}>
        <h1 className="header-section text-white text-5xl 2lg:text-4xl lg:text-3xl">
          {firstTitle} <br /> {secondTitle} <br />
        </h1>
        <h5
          className={
            path.startsWith("/independant") || path.startsWith("/entreprise")
              ? "text-white my-4 text-2xl 2lg:text-xl"
              : "text-white my-6 text-2xl 2lg:text-xl"
          }
        >
          {undertitle}
        </h5>

        {path.startsWith("/independant") || path.startsWith("/entreprise") ? (
          <div className="flex items-center">

            <div className="flex ml-5 mt-6">
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
  );
};

export default IntroSection;
