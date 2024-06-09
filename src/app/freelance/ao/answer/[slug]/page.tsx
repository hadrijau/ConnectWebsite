import React, { Suspense } from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import Link from "next/link";

import "@/styles/Freelance.css";
import { getMissionById } from "@/http/mission";

import "@/styles/Client.css";
import AnswerMission from "@/components/freelance/AnswerMission";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import { auth } from "@/auth";
import { redirect } from 'next/navigation' 
import { getFreelanceByEmail } from "@/http/freelance";
import Loading from "@/app/loading";

const AnswerMissionPage = async ({ params }: { params: { slug: string } }) => {
  const mission = await getMissionById(params.slug);

  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    redirect("/login")
  }

  const freelance = await getFreelanceByEmail(session.user.email)

  return (
    <Suspense fallback={<Loading />}>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between  mt-32">
        <FreelanceIntroSection
          firstTitle="Appel d'offres"

        />

        <div className="flex flex-col justify-between w-full mt-10 main-content">
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
          </Link>
            
          <AnswerMission mission={mission} freelance={freelance}/>
        </div>
      </main>
    </Suspense>

  )
};

export default AnswerMissionPage;
