"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "@/components/navbar/NavLink";
import { useSession, signOut } from "next-auth/react";
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

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const [viewProfileDropdown, setViewProfilDropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center px-10 pt-4 static-navbar pb-4">
      <NavLink href="/">
        <Image
          src={"/logo.svg"}
          alt="logo-connect"
          width={100}
          height={60}
          className="logo-connect"
        />
      </NavLink>
      <div
        className={`flex ${status === "authenticated" ? "w-9/12" : "w-7/12 "}`}
      >
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
          <NavLink
            href="/portage"
            className={`mt-2 ${status === "authenticated" ? "mr-10" : "mx-10"}`}
          >
            Société de portage
          </NavLink>
        )}

        <NavLink href="/metiers" className="mx-10 mt-2">
          Métiers
        </NavLink>
        <NavLink href="/histoire" className="mx-10 mt-2">
          Notre histoire
        </NavLink>
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
            onClick={() => setViewProfilDropdown(!viewProfileDropdown)}
          />
          {viewProfileDropdown && (
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
                Mon profil
              </p>
              <p
                className="profil-option cursor-pointer py-2 px-3"
                onClick={handleSignOut}
              >
                Déconnexion
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-4/12 justify-between">
          <NavLink href="/signup" background={background} className="mr-5">
            Découvrir maintenant
          </NavLink>
          <div
            style={{ display: "inline-block", transform: "scale(0.3, 4)" }}
            className="mt-2"
          >
            |
          </div>
          <NavLink href="/login" className="ml-5">
            Me connecter
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
