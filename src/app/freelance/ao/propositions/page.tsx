import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AODisplay from "@/components/freelance/AODisplay";
import { getAllMissionsByFreelanceId } from "@/http/freelance";

export default async function AOPropositionsPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const { approvedMissions, pendingMissions, likedMissions, lostMissions } =
    await getAllMissionsByFreelanceId(session.user.id);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <div className="flex justify-between w-full main-content flex-col">
          <AODisplay
            approvedMissions={approvedMissions}
            pendingMissions={pendingMissions}
            likedMissions={likedMissions}
            lostMissions={lostMissions}
          />
        </div>
      </main>
    </>
  );
}
