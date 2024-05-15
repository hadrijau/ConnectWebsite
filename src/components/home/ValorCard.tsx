"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import "@/styles/components/ValorCard.css";
import { useMediaQuery } from "@react-hook/media-query";

interface ValorCardProps {
  imageSrc: string;
  title: string;
  children?: ReactNode;
}

const ValorCard: React.FC<ValorCardProps> = ({ imageSrc, title, children }) => {
  const isWideScreen = useMediaQuery("(min-width: 1140px)");
  return (
    <div className="flex flex-col items-center mx-3 py-10 valor-container px-5">
      <Image
        src={imageSrc}
        alt=""
        height={isWideScreen ? 200 : 150}
        width={isWideScreen ? 200 : 150}
      />

      <h2 className="text-center font-bold text-4xl my-3">{title}</h2>
      <p className="text h-6/12 text-center">{children}</p>
    </div>
  );
};

export default ValorCard;
