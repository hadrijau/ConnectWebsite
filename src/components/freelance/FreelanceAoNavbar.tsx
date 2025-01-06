"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const FreelanceAoNavbar = () => {
  const path = usePathname();

  return (
    <div className="flex justify-between w-full md:hidden">
      <Link className="flex" href="/freelance/ao/recherche">
        <Image
          src="/freelanceMissionSpaceship.svg"
          width={30}
          height={30}
          alt="Recherche appel d'offre"
          className="mr-2"
        />
        <h5
          className={
            path.includes("recherche") ? "text-xl font-semibold" : "text-xl text-normal"
          }
        >
          Recherche AO
        </h5>
      </Link>
      <Link className="flex" href="/freelance/ao/cheris">
        <Image
          src="/AO_cheris.svg"
          width={30}
          height={30}
          alt="AO chéris"
          className="mr-2"
        />
        <h5
          className={
            path.includes("cheris") ? "text-xl font-semibold" : "text-xl text-normal"
          }
        >
          AO chéris
        </h5>
      </Link>
      <Link className="flex" href="/freelance/ao/propositions">
        <h5
          className={
            path.includes("propositions") ? "text-xl font-semibold" : "text-xl text-normal"
          }
        >
          Propositions
        </h5>
      </Link>
      <Link className="flex" href="/freelance/ao/prolongements">
        <h5
          className={
            path.includes("prolongements") ? "text-xl font-semibold" : "text-xl text-normal"
          }
        >
          Prolongements
        </h5>
      </Link>
    </div>
  );
};

export default FreelanceAoNavbar;
