import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { getMissions } from "@/http/mission";
import Link from "next/link";
import "@/styles/Client.css";
import { Mission } from "@/entities/mission";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientAOPage = async () => {
  const missions: Mission[] = await getMissions();
  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes appels d'offre"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant."
        />

        <div className="flex flex-col justify-between w-full px-40 mt-10 lg:px-10">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour</h5>
          </Link>
        </div>
      </main>
    </>
  );
};

export default ClientAOPage;
