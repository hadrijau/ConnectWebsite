import Image from "next/image";
import "@/styles/Freelance.css";
import DimensionCard from "@/components/home/DimensionCard";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import CardMission from "@/components/freelance/CardMission";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import { getMissions } from "@/http/mission";
import Mission from "@/entities/mission";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllMissionsByFreelanceId, getFreelanceById } from "@/http/freelance";

export default async function FreelancePage() {
  const missions: Mission[] = await getMissions();

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const recentMissions = missions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const { approvedMissions } = await getAllMissionsByFreelanceId(
    session.user.id
  );

  const freelance = await getFreelanceById(session.user.id);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Bienvenue dans ton espace"
          undertitle="“Le succès n'est pas final, l'échec n'est pas fatal."
          subtitle=" C'est le courage de continuer qui compte.”"
        />

        <div className="flex justify-between w-full mt-10 main-content">
          <div className="flex-col w-7/12 lg:w-8/12">
            <h1 className="text-semibold header-offres-freelance text-2xl">
              Les appels d&apos;offre du moment spécialement pour toi
            </h1>

            {recentMissions.map((mission: Mission, index) => {
              const { propositions } = mission;
              let propositionsLength = 0;
              if (propositions && propositions.length != 0) {
                propositionsLength = propositionsLength;
              }
              return <CardMission key={index} mission={mission} freelance={freelance}/>;
            })}
          </div>

          <div className="flex flex-col ongoing-mission-container-freelance p-10 rounded-3xl w-3/12 items-center">
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
            {approvedMissions.map((mission: Mission, index: number) => {
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
}
