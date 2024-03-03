import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import CardMission from "@/components/freelance/CardMission";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import { getMissions } from "@/http/mission";
import ongoingMissions from "@/mockData/ongoingmissions";
import Link from "next/link";

import "@/styles/Client.css";

export const ClientSpacePage = async () => {
  const missions = await getMissions();
  console.log("missions", missions);
  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Bienvenue dans"
          secondTitle="votre espace"
          undertitle="Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte."
          background="linear-gradient(94deg, rgba(216, 146, 192, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%);"
        />

        <div className="flex justify-between w-full px-40 mt-10">
          <div className="flex-col w-8/12">
            <div className="flex justify-between w-full">
              <h1 className="text-semibold header-offres text-2xl">
                Mes appels d&apos;offres
              </h1>
              <Link href="create-oa">+ Ajouter un appel d&apos;offre</Link>
            </div>

            {missions.map((mission, index: number) => {
              const {
                title,
                companyName,
                price,
                time,
                companyLogo,
                propositions,
                date,
                length,
              } = mission;
              return (
                <CardMission
                  key={index}
                  title={title}
                  propositions={propositions}
                  date={date}
                  companyLogo={"/logoSoge.svg"}
                  companyName={"Company B"}
                  price={price}
                  length={length}
                />
              );
            })}
          </div>

          <div className="flex flex-col ongoing-mission-container p-10 rounded-3xl w-3/12">
            <h5 className="text-center text-normal text-xl">
              Les missions en cours...
            </h5>
            {ongoingMissions.map((mission, index) => {
              const { title, company, date } = mission;
              return (
                <CardOnGoingMission
                  key={index}
                  title={title}
                  company={company}
                  date={date}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientSpacePage;
