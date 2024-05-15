"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ClientNavLink from "@/components/navbar/ClientNavLink";
import { signOut } from "next-auth/react";
import "@/styles/components/NavBarProfile.css";

const ClientNavbar = () => {
  const path = usePathname();
  const router = useRouter();

  const [openPopupDisconnect, setOpenPopupDisconnect] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center px-10 pt-4 pb-4">
      <ClientNavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </ClientNavLink>

      <ClientNavLink href="/client/ao">AO</ClientNavLink>
      <ClientNavLink href="/client/ao">Missions</ClientNavLink>
      <ClientNavLink href="/client/ao">Mes entretiens</ClientNavLink>

      <ClientNavLink href="/client/ao" className="text-center">
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
            <div className="flex flex-col p-3 select-profile">
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/client/ao")}
              >
                Accueil
              </p>
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
                onClick={() => router.push("/client/profil/espace")}
              >
                Mon espace
              </p>
              <p
                className="profil-client-option cursor-pointer py-2 px-3"
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

export default ClientNavbar;
