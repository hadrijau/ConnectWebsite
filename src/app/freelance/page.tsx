import Image from "next/image";
import "@/styles/Freelance.css";
import DimensionCard from "@/components/home/DimensionCard";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
// import missions from "@/mockData/missions";
import CardMission from "@/components/freelance/CardMission";
import ongoingMissions from "@/mockData/ongoingmissions";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import { getMissions } from "@/http/mission";
import { Mission } from "@/entities/mission";

export default async function FreelancePage() {
  const missions: Mission[] = await getMissions();

  return (
    <>
      <FreelanceNavBar />
      <div className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Bienvenue dans"
          secondTitle="ton espace"
          undertitle="“Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte.”"
          image="/freelanceIntroSection.svg"
          background="linear-gradient(94deg, rgba(185, 211, 134, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"
        />

        <div className="flex justify-between w-full px-40 mt-10 lg:px-20">
          <div className="flex-col w-7/12 lg:w-8/12">
            <h1 className="text-semibold header-offres text-2xl">
              Les appels d&apos;offre du moment spécialement pour toi
            </h1>

            {missions.map((mission, index) => {
              const {
                _id,
                title,
                price,
                propositions,
                date,
                length,
              } = mission;
              return (
                <CardMission
                  key={index}
                  _id={_id}
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

          <div className="flex flex-col ongoing-mission-container p-10 rounded-3xl w-3/12 items-center">
            <Image
              src="/freelanceMissionSpaceship.svg"
              width={70}
              height={70}
              alt="Missions en cours"
              className="mb-5"
            />
            <h5 className="text-center text-normal text-xl">
              Mes missions en cours...
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
      </div>
    </>
  );
}
