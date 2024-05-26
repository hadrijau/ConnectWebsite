"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "@/components/navbar/NavLink";
import { useSession, signOut } from "next-auth/react";
import "@/styles/components/NavBar.css";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  let userType = session?.user?.type;
  console.log("userType", userType);
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

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

  const [viewProfileDropdown, setViewProfilDropdown] = useState(false);

  const [logoFullShown, setLogoFullShown] = useState(false);

  return (
    <nav className="flex justify-between items-center px-10 pt-4 static-navbar pb-4">
      <NavLink href="/">
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
      </NavLink>
      <div
        className={`nav-items flex ${
          status === "authenticated" ? "w-9/12" : "w-7/12 "
        }`}
      >
        {path.startsWith("/independant") && (
          <div
            style={{ background: "#D892C0" }}
            className="py-2 px-10 rounded-lg cursor-pointer mr-10 lg:mr-2 lg:px-6"
            onClick={() => router.push("/entreprise")}
          >
            <p className="text-white xl:text-base 2lg:text-sm text-normal">
              Entreprise
            </p>
          </div>
        )}
        {path.startsWith("/entreprise") && (
          <div
            style={{ background: "#B9D386" }}
            className="py-2 px-6 rounded-lg cursor-pointer lg:px-6"
            onClick={() => router.push("/independant")}
          >
            <p className="text-white 2lg:text-sm text-normal">Indépendant</p>
          </div>
        )}
        {!path.startsWith("/entreprise") && (
          <NavLink
            href="/portage"
            className={`mt-2 text-normal ${
              status === "authenticated" ? "mr-10" : "mx-10 2xl:mx-4 lg:mx-2"
            }`}
          >
            Société de portage
          </NavLink>
        )}
        <NavLink href="/metiers" className="mx-10 mt-2 2xl:mx-4 text-normal">
          Métiers
        </NavLink>
        <NavLink href="/histoire" className="mx-10 mt-2 2xl:mx-4 text-normal">
          Notre histoire
        </NavLink>
      </div>

      {status === "authenticated" ? (
        <div className="flex">
          <Image
            src={
              userType === "client"
                ? "/clientNotification.svg"
                : "/notifFreelanceNav.svg"
            }
            alt="Notifications"
            width={35}
            height={35}
            className="mx-3"
          />
          <Image
            src={
              userType === "client"
                ? "/clientProfilNav.svg"
                : "/freelanceProfileNav.svg"
            }
            alt="Notifications"
            width={60}
            className="mx-3 cursor-pointer relative"
            height={60}
            onClick={() => setViewProfilDropdown(!viewProfileDropdown)}
          />
          {viewProfileDropdown && (
            <div className={`flex flex-col p-3 select-profile`}>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer py-2 px-3"
                    : "profil-option-indep cursor-pointer py-2 px-3"
                }
                onClick={() => {
                  if (userType === "client") {
                    router.push("/client");
                  } else {
                    router.push("/freelance");
                  }
                }}
              >
                Accueil
              </p>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer py-2 px-3"
                    : "profil-option-indep cursor-pointer py-2 px-3"
                }
                onClick={() => {
                  if (userType === "client") {
                    router.push("/client/ao");
                  } else {
                    router.push("/freelance/profil");
                  }
                }}
              >
                Mon profil
              </p>
              <p
                className={
                  userType === "client"
                    ? "profil-option-client cursor-pointer py-2 px-3"
                    : "profil-option-indep cursor-pointer py-2 px-3"
                }
                onClick={handleSignOut}
              >
                Déconnexion
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-4/12 justify-between 2lg:w-5/12 nav-items">
          <NavLink
            href="/signup"
            background={background}
            className="mr-5 text-normal"
          >
            Découvrir maintenant
          </NavLink>
          <div
            style={{ display: "inline-block", transform: "scale(0.3, 4)" }}
            className="mt-2"
          >
            |
          </div>
          <NavLink href="/login" className="ml-5 text-normal">
            Me connecter
          </NavLink>
        </div>
      )}

      {/* Burger Menu for smaller screens */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>

      <div className={`menu-items ${menuOpen ? "show" : ""}`}>
        <NavLink
          href="/portage"
          className="text-normal"
          onClick={() => setMenuOpen(false)}
        >
          Société de portage
        </NavLink>
        <NavLink
          href="/metiers"
          className="text-normal"
          onClick={() => setMenuOpen(false)}
        >
          Métiers
        </NavLink>
        <NavLink
          href="/histoire"
          className="text-normal"
          onClick={() => setMenuOpen(false)}
        >
          Notre histoire
        </NavLink>
        {status === "authenticated" ? (
          <>
            <NavLink
              href="/freelance"
              className="text-normal"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              href="/freelance/profil"
              className="text-normal"
              onClick={() => setMenuOpen(false)}
            >
              Mon profil
            </NavLink>
            <p
              className="text-normal cursor-pointer"
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
            >
              Déconnexion
            </p>
          </>
        ) : (
          <>
            <NavLink
              href="/signup"
              className="text-normal"
              onClick={() => setMenuOpen(false)}
            >
              Découvrir maintenant
            </NavLink>
            <NavLink
              href="/login"
              className="text-normal"
              onClick={() => setMenuOpen(false)}
            >
              Me connecter
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
