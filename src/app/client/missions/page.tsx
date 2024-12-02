import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { auth } from "@/auth";
import "@/styles/Client.css";
import { getAllAcceptedMissionsByClientId } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import { redirect } from "next/navigation";
import DatagridMissionsClient from "@/components/datagrid/DatagridMissionsClient";

const ClientMissionsPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const { acceptedMissions } = await getAllAcceptedMissionsByClientId(
    session.user.id
  );

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Missions"
          undertitle="Je gère toutes les missions au sein de mon entreprise"
        />
        <div className="main-content w-full">
          <DatagridMissionsClient missions={acceptedMissions} />
        </div>
      </main>
    </>
  );
};

export default ClientMissionsPage;
