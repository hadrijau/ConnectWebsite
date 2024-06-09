import "@/styles/Freelance.css";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import UploadFreelanceDocumentForm from "@/components/forms/UploadFreelanceDocumentForm";
  
export default async function DocumentsPage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Mes documents officiels"
          undertitle="Ici je trouve tout ce qu'il me faut en matière d'administration..."
        />

        <UploadFreelanceDocumentForm /> 
      </main>
    </>
  );
}
