import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import Link from "next/link";
import "@/styles/Client.css";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import Proposition from "@/entities/proposition";
import { getPropositionsByMissionId } from "@/http/propositions";
import DatagridPropositions from "@/components/datagrid/DatagridPropositions";
import Image from "next/image";
const ClientPropositionsAOPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const propositions: Proposition[] = await getPropositionsByMissionId(
    params.slug
  );
  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes appels d'offre"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant."
        />

        <div className="main-content w-full">
          <div className="flex-col items-start self-start main-content">
            <Link href="/client/ao" className="w-1/12 flex">
              <h5 className="mb-10">&#60;- retour</h5>
            </Link>
            <div className="flex mb-5">
              <Image
                src="/logoSoge.svg"
                width={150}
                height={150}
                alt="Logo société générale"
              />
              <div className="flex-col">
                <h5 className="text-normal text-2xl">Chargé de projet IT</h5>
                <p className="text-xl">AO0001</p>
              </div>
            </div>
          </div>
          {propositions && <DatagridPropositions propositions={propositions} />}
        </div>
      </main>
    </>
  );
};

export default ClientPropositionsAOPage;
