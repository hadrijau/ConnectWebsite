import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AODisplay from "@/components/freelance/AODisplay";
import Proposition from "@/entities/proposition";
import { getPropositionsByFreelanceId } from "@/http/mission";

export default async function AOPropositionsPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const propositions: Proposition[] = await getPropositionsByFreelanceId(
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
          <AODisplay propositions={propositions} />
        </div>
      </main>
    </>
  );
}
