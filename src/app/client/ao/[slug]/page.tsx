import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { auth } from "@/auth";
import { getMissionById } from "@/http/mission";
import { getClientByEmail } from "@/http/client";
import DisplayMission from "@/components/client/DisplayMission";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import DisplayMissionMobile from "@/components/client/DisplayMissionMobile";
import { redirect } from "next/navigation";
import "@/styles/Client.css";

const ClientAODetailPage = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }

  const user = await getClientByEmail(session.user.email);
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
          <DisplayMission mission={mission} />
        </div>

        <div className="main-content w-full display-tablet-mobile">
          <DisplayMissionMobile mission={mission} user={user}/>
        </div>
      </main>
    </>
  );
};

export default ClientAODetailPage;
