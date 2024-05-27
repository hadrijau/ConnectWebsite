import "@/styles/Freelance.css";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import UploadFreelanceDocumentForm from "@/components/forms/UploadFreelanceDocumentForm";
  
export default async function MissionsPage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Mes missions"
          undertitle="Je gère mes missions. Quelles sont mes avancées ?"
        />

      </main>
    </>
  );
}
