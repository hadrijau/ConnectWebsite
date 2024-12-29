import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { getMissionById } from "@/http/mission";
import ModifyMissionForm from "@/components/forms/ModifyMissionForm";
import "@/styles/Client.css";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import ModifyMissionFormMobile from "@/components/forms/ModifyMissionFormMobile";

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

        <div className="main-content w-full display-computer">
          <ModifyMissionForm mission={mission} />
        </div>

        <div className="display-tablet-mobile">
          <ModifyMissionFormMobile mission={mission} />
        </div>
      </main>
    </>
  );
};

export default ClientAOModifyPage;
