"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavBarProfileFreelanceProps {
  className?: string;
}

const NavBarProfileFreelance: React.FC<NavBarProfileFreelanceProps> = ({
  className,
}) => {
  const path = usePathname();
  let color: string;
  if (path.startsWith("/freelance/profil")) {
    color = "#79B3D1";
  } else if (path.startsWith("/freelance/competences")) {
    color = "#D892C0";
  } else if (path.startsWith("/freelance/experiences")) {
    color = "#79B3D1";
  } else {
    color = "#D892C0";
  }
  const welcomeData = [
    {
      href: "/freelance/profil",
      title: "Mon profil",
      image: "/welcome1.svg",
    },
    {
      href: "/freelance/competences",
      title: "Mes compétences",
      image: "/welcome2.svg",
    },
    {
      href: "/freelance/experiences",
      title: "Mes expériences",
      image: "/welcome3.svg",
    },
    {
      href: "/freelance/entreprise",
      title: "Mon entreprise",
      image: "/welcome4.svg",
    },
  ];

  return (
    <div className={`flex-col bg-green p-10 ${className}`}>
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
              <Image src={image} alt="Mon Profil" width={130} height={130} />
            </div>
            <div
              className={
                path.startsWith(href.toString())
                  ? "flex justify-center items-center ml-10 freelance-active"
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

export default NavBarProfileFreelance;
