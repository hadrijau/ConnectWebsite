"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import FreelanceNavLink from "@/components/navbar/FreelanceNavLink";
import { signOut, useSession } from "next-auth/react";
import { baseUrl } from "@/lib/baseUrl";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import "@/styles/components/NavBarProfile.css";
import AODropdown from "@/components/navbar/AODropdown";

const FreelanceNavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }
  const [openAO, setOpenAO] = useState(false);
  const [openPopupDisconnect, setOpenPopupDisconnect] = useState(false);

  const handleOpenAO = () => {
    setOpenAO(!openAO);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `${baseUrl}/login` });
  };

  const [logoFullShown, setLogoFullShown] = useState(false);

  const handleNavigate = (href: string) => {
    router.push(href);
    router.refresh();
  };

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
        )}{" "}
      </FreelanceNavLink>

      <FreelanceNavLink
        href="/freelance/entreprise"
        className="display-computer"
      >
        Mon entreprise
      </FreelanceNavLink>
      <div className="display-computer">
        <AODropdown
          openAO={openAO}
          handleOpenAO={handleOpenAO}
          path={path}
          router={router}
        />
      </div>

      <FreelanceNavLink href="/freelance/missions" className="display-computer">
        Mes missions
      </FreelanceNavLink>

      <FreelanceNavLink
        href="/freelance/documents"
        className="text-center display-computer"
      >
        Mes documents
      </FreelanceNavLink>
      <div className="flex display-computer">
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
                onClick={() => handleNavigate("/freelance")}
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
                onClick={() => router.push("/freelance/settings")}
              >
                Paramètres
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
      <MobileNavbar
        menuOpen={openPopupDisconnect}
        setMenuOpen={setOpenPopupDisconnect}
        setLogoFullShown={setLogoFullShown}
        logoFullShown={logoFullShown}
        userType="freelance"
        handleSignOut={handleSignOut}
        status={status}
      />
    </nav>
  );
};

export default FreelanceNavBar;
