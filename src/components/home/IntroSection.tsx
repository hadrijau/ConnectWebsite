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
  thirdTitle: string;
  undertitle: string;
  image: string;
  background: string;
  buttonBackground?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  firstTitle,
  secondTitle,
  thirdTitle,
  undertitle,
  image,
  background,
  buttonBackground,
}) => {
  const path = usePathname();
  return (
    <div
      className="section-background flex px-20 pt-20 justify-between mt-2"
      style={{ background: background }}
    >
      <div className="pt-5">
        <h1 className="header-section text-white text-6xl">
          {firstTitle} <br /> {secondTitle} <br /> {thirdTitle}
        </h1>
        <h5
          className={
            path.startsWith("/independant") || path.startsWith("/entreprise")
              ? "text-white my-10 text-2xl"
              : "text-white my-14 text-2xl"
          }
        >
          {undertitle}
        </h5>

        {path.startsWith("/independant") || path.startsWith("/entreprise") ? (
          <div className="flex flex-col">
            <div className="button-container">
              <LongButton
                title="Télécharger l'application"
                href="/entreprise"
                textClassName="text-xl"
                background={buttonBackground}
                className="green-button mr-2"
              ></LongButton>
            </div>

            <div className="flex mt-10">
              <Image
                src="googlePlay.svg"
                alt="Google Play"
                className="mr-10"
                width={170}
                height={66}
              />
              <Image
                className="mx-10"
                src="iosStore.svg"
                alt="IOS Store"
                width={170}
                height={70}
              />
            </div>
          </div>
        ) : (
          <div className="flex">
            <Button
              title="Entreprise"
              href="/entreprise"
              className="pink-button mr-2"
            ></Button>
            <Button
              title="Indépendant"
              href="/independant"
              className="empty-button mx-2"
            ></Button>
          </div>
        )}
      </div>

      <Image
        src={image}
        alt="Mission connect"
        width={500}
        height={500}
        className={
          path.startsWith("/portage") ||
          path.startsWith("/independant") ||
          path.startsWith("/histoire") ||
          path.startsWith("/entreprise") ||
          path.startsWith("/metiers")
            ? "img-portage"
            : "img-banner"
        }
      />
    </div>
  );
};

export default IntroSection;
