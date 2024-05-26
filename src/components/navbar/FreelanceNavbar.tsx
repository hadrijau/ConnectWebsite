"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import FreelanceNavLink from "@/components/navbar/FreelanceNavLink";
import "@/styles/components/NavBarProfile.css";
import { signOut } from "next-auth/react";

const FreelanceNavBar = () => {
  const path = usePathname();
  const router = useRouter();

  const [openAO, setOpenAO] = useState(false);
  const [openPopupDisconnect, setOpenPopupDisconnect] = useState(false);

  const handleOpenAO = () => {
    setOpenAO(!openAO);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const [logoFullShown, setLogoFullShown] = useState(false);

  return (
    <nav className="flex justify-between items-center px-10 pt-4 pb-4 freelance-navbar">
      <FreelanceNavLink href="/">
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
        )}      </FreelanceNavLink>

      <FreelanceNavLink href="/freelance/entreprise">
        Mon entreprise
      </FreelanceNavLink>
      <div className="flex mt-5 relative">
        <h5
          className={
            path.startsWith("/freelance/ao")
              ? "cursor-pointer link-active-freelance"
              : "cursor-pointer nav-link-freelance"
          }
          onClick={handleOpenAO}
        >
          AO
        </h5>
        {path.startsWith("/freelance/ao") ? (
          <Image
            src="/arrow_down.svg"
            width={10}
            height={10}
            alt="Appel d'offres"
            className="cursor-pointer"
            onClick={handleOpenAO}
          />
        ) : (
          <Image
            src="/arrow_down_black.svg"
            width={10}
            height={10}
            alt="Appel d'offres"
            className="cursor-pointer"
            onClick={handleOpenAO}
          />
        )}

        {openAO && (
          <div className="flex flex-col select-ao p-3">
            <div className="flex cursor-pointer ao-option p-2">
              <Image
                src="/freelanceMissionSpaceship.svg"
                width={40}
                height={40}
                alt="Recherche appel d'offre"
                className="mr-2"
              />
              <div
                className="flex flex-col"
                onClick={() => router.push("/freelance/ao/recherche")}
              >
                <h5>Recherche un appel d&apos;offre</h5>
                <p className="text-xs undertitle-select">
                  Je veux me connecter
                </p>
              </div>
            </div>
            <div className="flex cursor-pointer ao-option p-2">
              <Image
                src="/AO_cheris.svg"
                width={40}
                height={40}
                alt="AO chéris"
                className="mr-2"
              />
              <div className="flex flex-col">
                <h5>AO chéris</h5>
                <p className="text-xs undertitle-select">
                  Intéressant ! Je dois encore réfléchir
                </p>
              </div>
            </div>

            <div className="flex flex-col ao-option p-2 cursor-pointer">
              <h5>Propositions</h5>
              <p className="text-xs undertitle-select">Ai-je été choisi ?</p>
            </div>
            <div className="flex flex-col ao-option p-2 cursor-pointer">
              <h5>Prolongements</h5>
              <p className="text-xs undertitle-select">Et zé partiiiiii !</p>
            </div>
          </div>
        )}
      </div>
      <FreelanceNavLink href="/freelance/missions">
        Mes missions
      </FreelanceNavLink>

      <FreelanceNavLink href="/freelance/documents" className="text-center">
        Mes documents
      </FreelanceNavLink>
      <div className="flex">
        <div
          style={{ display: "inline-block", transform: "scale(0.3, 4)" }}
          className="mr-10 mt-7"
        >
          |
        </div>
        <div className="flex justify-start">
          <Image
            src="/freelanceNavBarSearch.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="/notifFreelanceNav.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="/freelanceProfileNav.svg"
            alt="Notifications"
            width={60}
            className="mx-3 cursor-pointer relative"
            height={60}
            onClick={() => setOpenPopupDisconnect(!openPopupDisconnect)}
          />
          {openPopupDisconnect && (
            <div className="flex flex-col p-3 select-profile">
              <p
                className="profil-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/freelance")}
              >
                Accueil
              </p>
              <p
                className="profil-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/freelance/profil")}
              >
                Mon espace
              </p>
              <p
                className="profil-option cursor-pointer py-2 px-3"
                onClick={() => handleSignOut()}
              >
                Déconnexion
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FreelanceNavBar;
