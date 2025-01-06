import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import { getMissions } from "@/http/mission";
import Mission from "@/entities/mission";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import RechercheDisplay from "@/components/freelance/ao/RechercheDisplay";
import { getFreelanceById } from "@/http/freelance";
import "@/styles/Freelance.css";

export default async function RechercheAOPage() {
  const missions: Mission[] = await getMissions();

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const freelance = await getFreelanceById(session.user.id);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <div className="flex justify-between w-full main-content flex-col">
          <FreelanceAoNavbar />
          <RechercheDisplay missions={missions} freelance={freelance} />
        </div>
      </main>
    </>
  );
}
