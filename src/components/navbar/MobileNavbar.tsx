"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavLink from "@/components/navbar/NavLink";
import "@/styles/components/NavBar.css";

interface MobileNavbarProps {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  setLogoFullShown: (logoFullShown: boolean) => void;
  logoFullShown: boolean;
  userType: string;
  handleSignOut: () => void;
  status: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  menuOpen,
  setMenuOpen,
  setLogoFullShown,
  logoFullShown,
  userType,
  handleSignOut,
  status,
}) => {
  const router = useRouter();

  return (
    <div>
      {" "}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <div className={`menu-items p-6 ${menuOpen ? "show" : ""}`}>
        <div className="flex justify-between mb-5 mt-3">
          {logoFullShown ? (
            <Image
              src={"/logo_entier.svg"}
              alt="logo-connect"
              width={100}
              height={60}
              className="logo-full"
              onMouseLeave={() => setLogoFullShown(false)}
            />
          ) : (
            <Image
              src={"/logo.svg"}
              alt="logo-connect"
              width={100}
              height={60}
              onMouseEnter={() => setLogoFullShown(true)}
              className="logo-connect"
            />
          )}
          <Image
            src={"/closeIcon.svg"}
            alt="logo-connect"
            width={17}
            height={12}
            onClick={() => setMenuOpen(false)}
            className="logo-connect self-start"
          />
        </div>

        {status === "authenticated" && (
          <div className="flex">
            <Image
              src={
                userType === "client"
                  ? "/profilClient.svg"
                  : "/profilFreelance.svg"
              }
              alt="Profil"
              width={30}
              className="mx-3 cursor-pointer relative self-start"
              height={30}
            />
            <div className={`flex flex-col`}>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer text-sm font-medium mb-4 mt-2"
                    : "profil-option-indep cursor-pointer text-sm font-medium mb-4 mt-2"
                }
                onClick={() => {
                  if (userType === "client") {
                    router.push("/client");
                  } else {
                    router.push("/freelance");
                  }
                }}
              >
                Accueil
              </p>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer text-sm font-medium mb-4"
                    : "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={() => {
                  if (userType === "client") {
                    router.push("/client/profil");
                  } else {
                    router.push("/freelance/profil");
                  }
                }}
              >
                Mon profil
              </p>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer text-sm font-medium mb-4"
                    : "profil-option-indep cursor-pointer text-sm font-medium mb-4"
                }
                onClick={handleSignOut}
              >
                Déconnexion
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col ml-4 mr-5 mt-5">
          <NavLink
            href="/portage"
            className="text-normal mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Société de portage
          </NavLink>
          <NavLink
            href="/metiers"
            className="text-normal mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Métiers
          </NavLink>
          <NavLink
            href="/histoire"
            className="text-normal mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Notre histoire
          </NavLink>
        </div>

        {status !== "authenticated" && (
          <>
            <NavLink
              href="/signup"
              className="text-normal bg-insciption px-10 py-3 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              Découvrir maintenant
            </NavLink>
            <NavLink
              href="/login"
              className="text-normal my-5 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Me connecter
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
