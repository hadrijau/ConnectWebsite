"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "@/components/navbar/NavLink";
import { useSession } from "next-auth/react";
import "@/styles/components/NavBar.css";

const Navbar = () => {
  const { data: session, status } = useSession();

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

  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-10 pt-4 static-navbar">
      <NavLink href="/">
        <Image src={"/logo.svg"} alt="logo-connect" width={100} height={60} />
      </NavLink>
      <div className={`flex ${status === "authenticated" ? "w-9/12" : "w-7/12 "}`}>
      {path.startsWith("/independant") && (
        <div
          style={{ background: "#D892C0" }}
          className="py-2 px-10 rounded-lg cursor-pointer"
          onClick={() => router.push("/entreprise")}
        >
          <p className="text-white">Entreprise</p>
        </div>
      )}
      {path.startsWith("/entreprise") && (
        <div
          style={{ background: "#B9D386" }}
          className="py-2 px-6 rounded-lg cursor-pointer"
          onClick={() => router.push("/independant")}
        >
          <p className="text-white">Indépendant</p>
        </div>
      )}
      {!path.startsWith("/entreprise") && (
        <NavLink href="/portage" className={`mt-2 ${status === "authenticated" ? "mr-10" : "mx-10"}`}>Société de portage</NavLink>
      )}

      <NavLink href="/metiers" className="mx-10 mt-2">Métiers</NavLink>
      <NavLink href="/histoire" className="mx-10 mt-2">Notre histoire</NavLink>
      </div>
      

      {status === "authenticated" ? (
        <div className="flex">
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
          />
        </div>
      ) : (
        <div className="flex w-4/12 justify-between">
          <NavLink href="/signup" background={background} className="mr-5">
            Découvrir maintenant
          </NavLink>
          <div style={{ display: "inline-block", transform: "scale(0.3, 4)" }} className="mt-1">
            |
          </div>
          <NavLink href="/login" className="ml-5">Me connecter</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
