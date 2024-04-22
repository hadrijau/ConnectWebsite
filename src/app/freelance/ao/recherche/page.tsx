import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import UploadFreelanceDocumentForm from "@/components/forms/UploadFreelanceDocumentForm";
import FreelanceIntroSectionWithoutImage from "@/components/common/FreelanceIntroSectionWithoutImage";

export default async function RechercheAOPage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSectionWithoutImage
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
          background="linear-gradient(94deg, rgba(185, 211, 134, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"
        />

      </main>
    </>
  );
}
