"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/components/NavBar.css";

const MobileNavbarFreelanceProfile = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div>
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <div className={`menu-items p-6 bg-freelance ${menuOpen ? "show" : ""}`}>
        <div className="flex justify-between mb-5 mt-3">
          <Image
            src={"/logo.svg"}
            alt="logo-connect"
            width={100}
            height={60}
            className="logo-connect"
          />

          <Image
            src={"/closeIcon.svg"}
            alt="logo-connect"
            width={17}
            height={12}
            onClick={() => setMenuOpen(false)}
            className="logo-connect self-start"
          />
        </div>

        <div className="flex flex-col mx-3">
          <div className="flex">
            <div className={`flex flex-col`}>
              <p
                className={
                  "profil-option-indep cursor-pointer text-sm font-medium mb-4 mt-2"
                }
                onClick={() => {
                  router.push("/freelance");
                }}
              >
                Accueil
              </p>
              <p
                className={
                  "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={() => {
                  router.push("/freelance/profil");
                }}
              >
                Mon profil
              </p>
              <p
                className={
                  "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={() => {
                  router.push("/freelance/profil/competences");
                }}
              >
                Mes compétences
              </p>

              <p
                className={
                  "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={() => {
                  router.push("/freelance/profil/experiences");
                }}
              >
                Mes expériences
              </p>

              <p
                className={
                  "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={() => {
                  router.push("/freelance/profil/entreprise");
                }}
              >
                Mon entreprise
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbarFreelanceProfile;
