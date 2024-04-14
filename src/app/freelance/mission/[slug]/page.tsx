import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import Link from "next/link";

import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import DisplayMission from "@/components/freelance/DisplayMission";

//@ts-ignore
const FreelanceMissionDetailPage = async ({ params }) => {
  const mission = await getMissionById(params.slug);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Appel d'offre"
          background="linear-gradient(94deg, rgba(185, 211, 134, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"

        />

        <div className="flex flex-col justify-between w-full px-40 mt-10 lg:px-10">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
          </Link>
            
          <DisplayMission mission={mission} />
        </div>
      </main>
    </>
  );
};

export default FreelanceMissionDetailPage;
