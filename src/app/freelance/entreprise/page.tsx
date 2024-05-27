import "@/styles/Freelance.css";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
  
export default async function EnterprisePage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Mon entreprise"
          undertitle=""
        />

      </main>
    </>
  );
}
