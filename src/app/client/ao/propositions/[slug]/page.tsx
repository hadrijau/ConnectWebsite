import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import Link from "next/link";
import "@/styles/Client.css";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import DatagridPropositions from "@/components/datagrid/DatagridPropositions";
import Image from "next/image";
import { getMissionById } from "@/http/mission";
import Mission, { Proposition } from "@/entities/mission";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getClientByEmail } from "@/http/client";
import DatagridPropositionsMobile from "@/components/datagrid/DatagridPropositionsMobile";

const ClientPropositionsAOPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const missionId = params.slug;
  const mission: Mission = await getMissionById(missionId);
  const propositions: Proposition[] = mission.propositions;
  const session = await auth();

  const handleSignOut = () => {
    redirect("/login");
  };
  if (!session || !session.user || !session.user.email) {
    handleSignOut();
    return;
  }
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
          <div className="flex-col items-start self-start main-content">
            <Link href="/client/ao" className="w-1/12 flex md:w-3/12">
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
                <h5 className="text-normal text-2xl">{mission.title}</h5>
                <p className="text-xl">{mission.aoId}</p>
              </div>
            </div>
          </div>
          {propositions && (
            <>
              <div className="display-computer">
                <DatagridPropositions
                  propositions={propositions}
                  missionId={missionId}
                  client={client}
                />
              </div>
              <div className="display-tablet-mobile">
                <DatagridPropositionsMobile
                  propositions={propositions}
                  missionId={missionId}
                  client={client}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ClientPropositionsAOPage;
