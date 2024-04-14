"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavBarProfileClientProps {
  className?: string;
}

const NavBarProfileClient: React.FC<NavBarProfileClientProps> = ({
  className,
}) => {
  const path = usePathname();
  let color: string;
  if (path.startsWith("/client/profil/espace")) {
    color = "#79B3D1";
  } else if (path.startsWith("/client/competences")) {
    color = "#D892C0";
  } else if (path.startsWith("/client/experiences")) {
    color = "#79B3D1";
  } else {
    color = "#D892C0";
  }
  const welcomeData = [
    {
      href: "/client/profil/espace",
      title: "Mon profil",
      image: "/welcome4.svg",
    },

  ];

  return (
    <div className={`flex-col bg-pink p-10 ${className}`}>
      <Image
        src="/logoWithConnect.svg"
        alt="Logo Connect avec le nom"
        width={120}
        height={120}
        className="mb-10"
      />
      {welcomeData.map((data, index) => {
        const { href, title, image } = data;
        return (
          <Link href={href} key={index} className="flex my-10">
            <div className="bg-white rounded-full overflow-hidden">
              <img src={image} alt="Mon Profil"  className="nav-profil-img"/>
            </div>
            <div
              className={
                path.startsWith(href.toString())
                  ? "flex justify-center items-center ml-10 client-active"
                  : "flex justify-center items-center ml-10"
              }
            >
              <h5
                className="font-normal text-xl"
                style={
                  path.startsWith(href.toString())
                    ? {
                        fontWeight: "bold",
                        borderBottom: `5px solid ${color}`,
                        paddingBottom: "0.5rem",
                      }
                    : undefined
                }
              >
                {title}
              </h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavBarProfileClient;
