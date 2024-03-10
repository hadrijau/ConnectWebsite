import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import FormButton from "@/components/common/FormButton";
import Link from "next/link";
import Image from "next/image";

import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import DisplayOrModifyMission from "@/components/client/DisplayOrModifyMission";

const ClientAODetailPage = async ({ params }) => {
  const mission = await getMissionById(params.slug);
  console.log("mission", mission);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Mes appels"
          secondTitle="d'offres"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant. "
          background="linear-gradient(94deg, rgba(216, 146, 192, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"
          image="/aoIntroSection.svg"
        />

        <div className="flex flex-col justify-between w-full px-40 mt-10">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
          </Link>
            
          <DisplayOrModifyMission mission={mission} />
        </div>
      </main>
    </>
  );
};

export default ClientAODetailPage;
