import React from "react";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CardMissionClient from "@/components/client/CardMissionClient";
import { getMissionsByClientId } from "@/http/mission";
import Link from "next/link";
import Image from "next/image";
import "@/styles/Client.css";
import Mission from "@/entities/mission";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import { auth } from "@/auth";
import Loading from "@/app/loading";
import MobileIntroClientSection from "@/components/common/MobileIntroClientSection";
import CardMissionMobileClient from "@/components/client/CardMissionClientMobile";

const ClientSpacePage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <Loading />;
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

        <MobileIntroClientSection
          firstTitle="Bienvenue dans ton espace"
          secondTitle="Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte."
        />
        <div className="flex justify-between w-full mt-10 main-content sm:flex-col">
          <div className="flex-col w-8/12 md:w-7/12 sm:w-full">
            <div className="flex justify-between w-full items-center md:flex-col-reverse md:items-start">
              <h1 className="text-semibold header-offres-client text-2xl">
                Mes appels d&apos;offres
              </h1>
              <Link href="/client/ao/create-ao" className="text-normal md:mb-8">
                + Ajouter un appel d&apos;offres
              </Link>
            </div>

            {missions.map((mission, index: number) => {
              const {
                _id,
                title,
                price,
                propositions,
                date,
                length,
                createdAt,
              } = mission;
              let propositionsLength = 0;
              if (propositions && propositions.length != 0) {
                propositionsLength = propositionsLength;
              }
              return (
                <div key={index}>
                  <div className="display-computer">
                    <CardMissionClient
                      _id={_id!}
                      title={title}
                      propositions={propositionsLength}
                      date={date}
                      companyLogo={"/logoSoge.svg"}
                      companyName={"Company B"}
                      price={price}
                      length={length}
                      createdAt={createdAt}
                    />
                  </div>
                  <div className="display-tablet-mobile">
                    <CardMissionMobileClient
                      _id={_id!}
                      title={title}
                      propositions={propositionsLength}
                      date={date}
                      companyLogo={"/logoSoge.svg"}
                      companyName={"Company B"}
                      price={price}
                      length={length}
                      createdAt={createdAt}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col ongoing-mission-container-client p-10 rounded-3xl w-3/12 items-center 2md:p-5 md:w-4/12 sm:w-full md:p-5 ">
            <Image
              src="/clientMissionSpaceship.svg"
              width={70}
              height={70}
              alt="Missions en cours"
              className="mb-5"
            />
            <h5 className="text-center text-normal text-xl md:text-base">
              Les missions en cours...
            </h5>
            {missions.map((mission: Mission, index: number) => {
              const { title, companyName, date } = mission;
              return (
                <CardOnGoingMission
                  key={index}
                  title={title}
                  company={companyName}
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
