import "@/styles/Freelance.css";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import UploadFreelanceDocumentForm from "@/components/forms/UploadFreelanceDocumentForm";

export default async function DocumentsPage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Mes documents officiels"
          undertitle="Ici je trouve tout ce qu'il me faut en matière d'administration..."
          image="/documentImage.svg"
          background="linear-gradient(94deg, rgba(185, 211, 134, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"
        />

        <UploadFreelanceDocumentForm /> 
      </main>
    </>
  );
}
