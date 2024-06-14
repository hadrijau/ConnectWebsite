import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import FormButton from "@/components/common/FormButton";
import Link from "next/link";
import Image from "next/image";

import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import DisplayMission from "@/components/client/DisplayMission";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientAODetailPage = async ({ params }: { params: { slug: string } }) => {
  const mission = await getMissionById(params.slug);
  
  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes appels d'offres"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant. "
        />

        <div className="main-content w-full">
          <DisplayMission mission={mission} />
        </div>
      </main>
    </>
  );
};

export default ClientAODetailPage;
