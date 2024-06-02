import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import UploadFreelanceDocumentForm from "@/components/forms/UploadFreelanceDocumentForm";
import FreelanceIntroSectionWithoutImage from "@/components/common/FreelanceIntroSectionWithoutImage";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";
import { getMissions } from "@/http/mission";
import Mission from "@/entities/mission";
import { auth } from "@/auth";
import CardMission from "@/components/freelance/CardMission";
import { redirect } from "next/navigation";
import AODisplay from "@/components/freelance/AODisplay";

export default async function AOPropositionsPage() {
  const missions: Mission[] = await getMissions();

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <div className="flex justify-between w-full main-content flex-col">
          <AODisplay missions={missions} />
        </div>
      </main>
    </>
  );
}
