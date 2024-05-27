import React from "react";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CardMissionClient from "@/components/freelance/CardMissionClient";
import { getMissions, getMissionsByClientId } from "@/http/mission";
import ongoingMissions from "@/mockData/ongoingmissions";
import Link from "next/link";
import Image from "next/image";
import "@/styles/Client.css";
import Mission from "@/entities/mission";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import { auth } from "@/auth";
import Loading from "@/app/loading";

const ClientSpacePage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <Loading />
  }
  const missions: Mission[] = await getMissionsByClientId(session.user.id);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Bienvenue dans ton espace"
          undertitle="Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte."
        />

        <div className="flex justify-between w-full mt-10 main-content">
          <div className="flex-col w-8/12">
            <div className="flex justify-between w-full">
              <h1 className="text-semibold header-offres text-2xl">
                Mes appels d&apos;offres
              </h1>
              <Link href="/client/create-ao" className="text-normal">+ Ajouter un appel d&apos;offres</Link>
            </div>

            {missions.map((mission, index: number) => {
              const {
                _id,
                title,
                price,
                propositions,
                date,
                length,
                createdAt
              } = mission;
              return (
                <CardMissionClient
                  _id={_id}
                  key={index}
                  title={title}
                  propositions={propositions}
                  date={date}
                  companyLogo={"/logoSoge.svg"}
                  companyName={"Company B"}
                  price={price}
                  length={length}
                  createdAt={createdAt}
                />
              );
            })}
          </div>

          <div className="flex flex-col ongoing-mission-container p-10 rounded-3xl w-3/12 items-center">
            <Image
              src="/clientMissionSpaceship.svg"
              width={70}
              height={70}
              alt="Missions en cours"
              className="mb-5"
            />
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
