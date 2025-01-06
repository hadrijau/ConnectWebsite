import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import CardMission from "@/components/freelance/CardMission";
import { getMissions } from "@/http/mission";
import Mission from "@/entities/mission";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  getAllMissionsByFreelanceId,
  getFreelanceById,
} from "@/http/freelance";
import CardMissionMobile from "@/components/freelance/CardMissionMobile";
import OnGoingMissionContainer from "@/components/common/OnGoingMissionContainer";
import MobileIntroClientSection from "@/components/common/MobileIntroClientSection";
import "@/styles/Freelance.css";

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
  // @ts-ignore
  let userType = session?.user?.type;
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Bienvenue dans ton espace"
          undertitle="Le succès n'est pas final, l'échec n'est pas fatal."
          subtitle="C'est le courage de continuer qui compte."
        />

        <MobileIntroClientSection
          firstTitle="Bienvenue dans ton espace"
          secondTitle="Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte."
        />
        <div className="flex justify-between w-full mt-10 main-content sm:flex-col">
          <div className="flex-col w-8/12 md:w-7/12 sm:w-full">
            <h1 className="text-semibold header-offres-freelance text-2xl">
              Les appels d&apos;offre du moment spécialement pour toi
            </h1>

            {recentMissions.map((mission: Mission, index) => {
              const { propositions } = mission;
              let propositionsLength = 0;
              if (propositions && propositions.length != 0) {
                propositionsLength = propositionsLength;
              }
              return (
                <div key={index}>
                  <div className="display-computer">
                    <CardMission
                      key={index}
                      mission={mission}
                      freelance={freelance}
                    />
                  </div>
                  <div className="display-tablet-mobile">
                    <CardMissionMobile
                      key={index}
                      mission={mission}
                      freelance={freelance}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <OnGoingMissionContainer
            missions={approvedMissions}
            userType={userType}
          />
        </div>
      </main>
    </>
  );
}
