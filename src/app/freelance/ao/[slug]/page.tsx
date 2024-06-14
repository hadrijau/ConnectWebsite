import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import Link from "next/link";

import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import DisplayMission from "@/components/freelance/DisplayMission";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import { auth } from "@/auth";
import { getFreelanceByEmail } from "@/http/freelance";

const FreelanceMissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const mission = await getMissionById(params.slug);
  const session = await auth();
  const user = await getFreelanceByEmail(session?.user?.email!);
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection firstTitle="Appel d'offre" />

        <div className="flex flex-col justify-between w-full mt-10 main-content">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
          </Link>

          <DisplayMission mission={mission} freelance={true} user={user}/>
        </div>
      </main>
    </>
  );
};

export default FreelanceMissionDetailPage;
