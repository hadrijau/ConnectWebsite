import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllMissionsByFreelanceId } from "@/http/freelance";
import ProlongementDisplay from "@/components/freelance/ProlongementDisplay";

export default async function AOPropositionsPage() {
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
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <div className="flex justify-between w-full main-content flex-col">
          <ProlongementDisplay approvedMissions={approvedMissions} />
        </div>
      </main>
    </>
  );
}
