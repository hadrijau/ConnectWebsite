"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/styles/components/FreelanceIntroSection.css";

interface FreelanceIntroSectionWithoutImageProps {
  firstTitle: string;
  undertitle?: string;
  background: string;
  buttonBackground?: string;
}

const FreelanceIntroSectionWithoutImage: React.FC<
  FreelanceIntroSectionWithoutImageProps
> = ({ firstTitle, undertitle, background }) => {
  return (
    <div
      className="section-freelance-background flex px-20 py-5 justify-between mt-2 leading-relaxed"
      style={{ background: background }}
    >
      <div className="py-5 flex">
        <h2 className=" text-5xl text-normal">
          {firstTitle} - 
        </h2>
        <h5 className="text-3xl text-light mt-2 ml-3">{undertitle}</h5>
      </div>
    </div>
  );
};

export default FreelanceIntroSectionWithoutImage;
