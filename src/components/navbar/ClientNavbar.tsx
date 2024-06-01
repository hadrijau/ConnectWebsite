"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ClientNavLink from "@/components/navbar/ClientNavLink";
import { useSession, signOut } from "next-auth/react";
import "@/styles/components/NavBarProfile.css";
import { baseUrl } from "@/lib/baseUrl";

const ClientNavbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [openPopupDisconnect, setOpenPopupDisconnect] = useState(false);

  if (status === "unauthenticated") {
    router.push("/login")
  }
  const handleSignOut = () => {
    signOut({callbackUrl: `${baseUrl}/login`});
  };
  const [logoFullShown, setLogoFullShown] = useState(false);

  return (
    <nav className="flex justify-between items-center px-10 pt-4 pb-4">
      <ClientNavLink href="/">
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
      </ClientNavLink>

      <ClientNavLink href="/client/ao">AO</ClientNavLink>
      <ClientNavLink href="/client/missions">Missions</ClientNavLink>

      <ClientNavLink href="/client/documents" className="text-center">
        Documents officiels
      </ClientNavLink>
      <div className="flex">
        <div
          style={{ display: "inline-block", transform: "scale(0.3, 4)" }}
          className="mr-10 mt-7"
        >
          |
        </div>
        <div className="flex justify-start">
          <Image
            src="/clientNavBarSearch.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="/clientNotification.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="/clientProfilNav.svg"
            alt="Notifications"
            width={60}
            className="mx-3 cursor-pointer"
            height={60}
            onClick={() => setOpenPopupDisconnect(!openPopupDisconnect)}
          />
          {openPopupDisconnect && (
            <div className="flex flex-col p-3 select-profile-client">
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/client")}
              >
                Accueil
              </p>
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/client/profil")}
              >
                Mon profil
              </p>
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
                onClick={handleSignOut}
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

export default ClientNavbar;
