"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FreelanceNavLink from "@/components/navbar/FreelanceNavLink";

const FreelanceNavBar = () => {
  const path = usePathname();

  return (
    <nav className="flex justify-between items-center px-10 pt-4 pb-4">
      <FreelanceNavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </FreelanceNavLink>

      <FreelanceNavLink href="/freelance/entreprise">Mon entreprise</FreelanceNavLink>
      <FreelanceNavLink href="/freelance/AO">AO</FreelanceNavLink>
      <FreelanceNavLink href="/freelance/missions">Mes missions</FreelanceNavLink>

      <FreelanceNavLink href="/freelance/documents" className="text-center">
        Mes documents <br /> officiels
      </FreelanceNavLink>
      <div className="flex">
        <div style={{ display: "inline-block", transform: "scale(0.3, 4)" }} className="mr-10 mt-7">
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
            className="mx-3 cursor-pointer"
            height={60}
          />
        </div>
      </div>
    </nav>
  );
};

export default FreelanceNavBar;
