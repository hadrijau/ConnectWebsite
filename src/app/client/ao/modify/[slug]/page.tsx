import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { getMissionById } from "@/http/mission";
import ModifyMissionForm from "@/components/forms/ModifyMissionForm";
import "@/styles/Client.css";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientAOModifyPage = async ({ params }: { params: { slug: string } }) => {
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
          <ModifyMissionForm mission={mission} />
        </div>
      </main>
    </>
  );
};

export default ClientAOModifyPage;
