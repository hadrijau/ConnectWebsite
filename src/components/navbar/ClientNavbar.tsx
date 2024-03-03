"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ClientNavLink from "@/components/navbar/ClientNavLink";

const ClientNavbar = () => {
  const path = usePathname();

  return (
    <nav className="flex justify-between items-center px-10 pt-4 pb-4">
      <ClientNavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </ClientNavLink>

      <ClientNavLink href="/freelance/entreprise">AO</ClientNavLink>
      <ClientNavLink href="/freelance/AO">Missions</ClientNavLink>
      <ClientNavLink href="/freelance/missions">Mes entretiens</ClientNavLink>

      <ClientNavLink href="/freelance/documents" className="text-center">
        Documents officiels
      </ClientNavLink>
      <div className="flex">
        <div style={{ display: "inline-block", transform: "scale(0.3, 4)" }} className="mr-10 mt-7">
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
          />
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
