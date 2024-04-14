import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import Link from "next/link";

import "@/styles/Freelance.css";
import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import AnswerMission from "@/components/freelance/AnswerMission";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";

//@ts-ignore
const AnswerMissionPage = async ({ params }) => {
  const mission = await getMissionById(params.slug);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Réponse à l'appel d'offres"
          background="linear-gradient(94deg, rgba(185, 211, 134, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"

        />

        <div className="flex flex-col justify-between w-full px-40 mt-10 lg:px-10">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
          </Link>
            
          <AnswerMission mission={mission} />
        </div>
      </main>
    </>
  );
};

export default AnswerMissionPage;
