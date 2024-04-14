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
  let className = "img-portage"
  if (path == "/") {
    className = "img-banner"
  } else if (path.startsWith("/histoire")) {
    className = "img-histoire"
  } else if (path.startsWith("/independant") || path.startsWith("/entreprise"))   {
    className = "img-indep"
  }

  return (
    <div
      className="section-background flex px-20 py-10 justify-between mt-10"
      style={{ background: background }}
    >
      <div className="pt-5">
        <h1 className="header-section text-white text-4xl lg:text-3xl ">
          {firstTitle} <br /> {secondTitle} <br />
        </h1>
        <h5
          className={
            path.startsWith("/independant") || path.startsWith("/entreprise")
              ? "text-white my-4 text-2xl lg:text-xl"
              : "text-white my-6 text-2xl lg:text-xl"
          }
        >
          {undertitle}
        </h5>

        {path.startsWith("/independant") || path.startsWith("/entreprise") ? (
          <div className="flex items-center">
            <div className="button-container">
              <LongButton
                title="Télécharger Connect"
                href="/entreprise"
                textClassName="text-xl"
                background={buttonBackground}
                className="green-button mr-2"
              ></LongButton>
            </div>

            <div className="flex flex-col ml-5">
              <Image
                src="googlePlay.svg"
                alt="Google Play"
                className="mr-10"
                width={120}
                height={66}
              />
              <Image
                className="mt-5"
                src="iosStore.svg"
                alt="IOS Store"
                width={120}
                height={70}
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

      <Image
        src={image}
        alt="Mission connect"
        width={500}
        height={500}
        className={className}
      />
    </div>
  );
};

export default IntroSection;
