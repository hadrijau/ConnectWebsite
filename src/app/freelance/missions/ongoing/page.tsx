import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import MissionsDisplay from "@/components/freelance/missions/MissionsDisplay";
import { getAllMissionsByFreelanceId } from "@/http/freelance";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/styles/Freelance.css";

export default async function OngoingMissionsPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const { approvedMissions } = await getAllMissionsByFreelanceId(
    session.user.id
  );

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Mes missions"
          undertitle="Je gère mes missions"
          subtitle="Quelles sont mes avancées ?"
        />

        <MissionsDisplay approvedMissions={approvedMissions} />
      </main>
    </>
  );
}
