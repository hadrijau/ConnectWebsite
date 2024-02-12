"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavLink from "@/components/navbar/NavLink";

const Navbar = () => {
  const path = usePathname();
  let background;
  if (path.startsWith("/independant")) {
    background =
      "linear-gradient(91.53deg, rgba(185, 211, 134, 0.6) 3.67%, rgba(58, 142, 186, 0.6) 100%)";
  } else if (path.startsWith("/entreprise")) {
    background =
      "linear-gradient(91.53deg, rgba(216, 146, 192, 0.6) 3.67%, rgba(185, 211, 134, 0.6) 100%)";
  } else {
    background =
      "linear-gradient(91.53deg, rgba(216, 146, 192, 0.6) 3.67%, rgba(58, 142, 186, 0.6) 100%)";
  }

  return (
    <nav className="flex justify-between items-center px-10 pt-4">
      <NavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </NavLink>
      {path.startsWith("/independant") && (
        <div style={{ background: "#B9D386" }} className="py-2 px-6 rounded-lg">
          <p className="text-white">Indépendant</p>
        </div>
      )}
      {path.startsWith("/entreprise") && (
        <div
          style={{ background: "#D892C0" }}
          className="py-2 px-10 rounded-lg"
        >
          <p className="text-white">Entreprise</p>
        </div>
      )}
      <NavLink
        href="/portage"
        className={path.startsWith("/entreprise") ? "text-white" : ""}
      >
        Société de portage
      </NavLink>
      <NavLink href="/metiers">Nos métiers</NavLink>
      <NavLink href="/histoire">Notre histoire</NavLink>
      {path.startsWith("/independant") || path.startsWith("/entreprise") ? (
        <></>
      ) : (
        <Image src="searchIcon.svg" alt="Search" width={24} height={24} />
      )}

      <NavLink href="/decouvrir" background={background}>
        Découvrir maintenant
      </NavLink>
      <div style={{ display: "inline-block", transform: "scale(1, 3)" }}>|</div>
      <NavLink href="/login">Me connecter</NavLink>
    </nav>
  );
};

export default Navbar;
