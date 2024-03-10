"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/styles/components/FreelanceIntroSection.css";

interface FreelanceIntroSectionProps {
  firstTitle: string;
  secondTitle?: string;
  undertitle?: string;
  image?: string;
  background: string;
  buttonBackground?: string;
}

const FreelanceIntroSection: React.FC<FreelanceIntroSectionProps> = ({
  firstTitle,
  secondTitle,
  undertitle,
  image,
  background,
}) => {
  const path = usePathname();

  return (
    <div
      className="section-freelance-background flex px-20 py-20 justify-between mt-2 leading-relaxed"
      style={{ background: background }}
    >
      <div className="pt-5">
        <h2 className=" text-6xl text-normal">{firstTitle}</h2>
        <h2 className=" text-6xl text-normal mt-5">{secondTitle}</h2>
        <h5 className="my-10 text-xl text-light">{undertitle}</h5>
      </div>

      {image && (
        <Image
          src={image}
          alt="Mission connect"
          width={0}
          height={0}
          className="img-section-freelance"
        />
      )}
    </div>
  );
};

export default FreelanceIntroSection;
