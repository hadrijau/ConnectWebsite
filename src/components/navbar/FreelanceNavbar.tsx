"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FreelanceNavLink from "@/components/navbar/FreelanceNavLink";

const FreelanceNavBar = () => {
  const path = usePathname();

  return (
    <nav className="flex justify-between items-center px-10 pt-4">
      <FreelanceNavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </FreelanceNavLink>

      <FreelanceNavLink href="/portage">Mon entreprise</FreelanceNavLink>
      <FreelanceNavLink href="/metiers">AO</FreelanceNavLink>
      <FreelanceNavLink href="/histoire">Mes missions</FreelanceNavLink>
      {path.startsWith("/independant") || path.startsWith("/entreprise") ? (
        <></>
      ) : (
        <Image src="searchIcon.svg" alt="Search" width={24} height={24} />
      )}

      <FreelanceNavLink href="/decouvrir" className="text-center">
        Mes documents <br /> officiels
      </FreelanceNavLink>
      <div className="flex">
        <div style={{ display: "inline-block", transform: "scale(0.3, 4)" }} className="mr-10 mt-3">
          |
        </div>
        <div className="flex justify-start">
          <Image
            src="freelanceNavBarSearch.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="notifFreelanceNav.svg"
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src="freelanceProfileNav.svg"
            alt="Notifications"
            width={35}
            className="mx-3"
            height={35}
          />
        </div>
      </div>
    </nav>
  );
};

export default FreelanceNavBar;
