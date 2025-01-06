import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  getAllMissionsByFreelanceId,
  getFreelanceById,
} from "@/http/freelance";
import DisplayAO from "@/components/freelance/ao/DisplayAO";

export default async function AOCherisPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const freelance = await getFreelanceById(session.user.id);
  const { likedMissions } = await getAllMissionsByFreelanceId(session.user.id);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <DisplayAO missions={likedMissions} freelance={freelance} />
      </main>
    </>
  );
}
