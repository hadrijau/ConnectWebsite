import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import FormButton from "@/components/common/FormButton";
import Link from "next/link";
import Image from "next/image";

import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import DisplayOrModifyMission from "@/components/client/DisplayOrModifyMission";

//@ts-ignore
const ClientAODetailPage = async ({ params }) => {
  const mission = await getMissionById(params.slug);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Mes appels d'offres"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant. "
        />

        <div className="flex flex-col justify-between w-full px-40 mt-10 lg:px-10">
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
