import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { getMissions, getMissionsByClientId } from "@/http/mission";
import Link from "next/link";
import "@/styles/Client.css";
import Mission from "@/entities/mission";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import Box from "@mui/material/Box";
import DataGridAO from "@/components/datagrid/DatagridAO";
import { auth } from "@/auth";
import Loading from "@/app/loading";
import { getClientByEmail } from "@/http/client";

const ClientAOPage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.email) {
    return <Loading />
  }
  const missions: Mission[] = await getMissionsByClientId(session.user.id);

  const client = await getClientByEmail(session.user.email);
  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes appels d'offre"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant."
        />

        <div className="main-content w-full">
          <Link href="/client/ao/create-ao" className="text-normal text-base ml-5">
            + Ajouter un appel d&apos;offres
          </Link>

          <DataGridAO missions={missions} user={client}/>
        </div>
      </main>
    </>
  );
};

export default ClientAOPage;
