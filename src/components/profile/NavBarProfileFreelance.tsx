"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/Freelance.css";
import CustomDialog from "../common/CustomDialog";
import Freelance from "@/entities/freelance";
import { deleteUser } from "@/http/user";
import { signOut } from "next-auth/react";

interface NavBarProfileFreelanceProps {
  className?: string;
  user: Freelance;
}

const NavBarProfileFreelance: React.FC<NavBarProfileFreelanceProps> = ({
  className,
  user,
}) => {
  const path = usePathname();
  const router = useRouter();
  let color: string;
  if (path == "/freelance/profil") {
    color = "#79B3D1";
  } else if (path == "/freelance/profil/competences") {
    color = "#D892C0";
  } else if (path == "/freelance/profil/experiences") {
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
      href: "/freelance/profil/competences",
      title: "Mes compétences",
      image: "/welcome2.svg",
    },
    {
      href: "/freelance/profil/experiences",
      title: "Mes expériences",
      image: "/welcome3.svg",
    },
    {
      href: "/freelance/profil/entreprise",
      title: "Mon entreprise",
      image: "/welcome4.svg",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    router.refresh();
  };

  const handleDeleteFreelance = async () => {
    const freelance = new Freelance({
      ...user,
    });
    router.push("/");
    await freelance.delete();
    await deleteUser(user.email);
    signOut();
  };
  return (
    <div className={`flex-col bg-green pt-10 px-10 ${className} lg:px-5`}>
      <Link href="/">
        <Image
          src="/logoWithConnect.svg"
          alt="Logo Connect avec le nom"
          width={120}
          height={120}
          className="mb-10"
        />
      </Link>

      {welcomeData.map((data, index) => {
        const { href, title, image } = data;
        return (
          <div
            onClick={() => handleNavigate(href)}
            key={index}
            className="flex my-10 cursor-pointer"
          >
            <div className="bg-white rounded-full flex justify-center items-center overflow-hidden mr-10 relative w-24 h-24 lg:w-20 lg:h-20">
              <Image src={image} alt="Mon Profil" layout="fill" />
            </div>
            <div className="flex justify-center items-center">
              <h5
                className="font-normal text-xl 2lg:text-base"
                style={
                  path == href.toString()
                    ? {
                        fontWeight: 600,
                        borderBottom: `5px solid ${color}`,
                        paddingBottom: "0.5rem",
                      }
                    : undefined
                }
              >
                {title}
              </h5>
            </div>
          </div>
        );
      })}

      <h5 className="cursor-pointer mt-20" onClick={handleClickOpen}>
        Supprimer mon compte
      </h5>
      <CustomDialog open={open} onClose={handleClose}>
        <h2 className="text-normal text-2xl mr-32 ml-10 mt-10">
          Es-tu sûr(e) de vouloir supprimer ton compte ?
        </h2>
        <h5 className="mb-10 ml-10 mt-3">
          Toutes tes données seront définitivement supprimées
        </h5>
        <div className="flex justify-center mb-10">
          <div
            className="delete-account-button-freelance cursor-pointer rounded-4xl py-3 w-4/12 text-center mr-2"
            onClick={handleDeleteFreelance}
          >
            Oui supprimer
          </div>
          <div
            className="delete-account-button-freelance cursor-pointer rounded-4xl py-3 w-4/12 text-center ml-2"
            onClick={handleClose}
          >
            Non je change d&apos;avis
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default NavBarProfileFreelance;
