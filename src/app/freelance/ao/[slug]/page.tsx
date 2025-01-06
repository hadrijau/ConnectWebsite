import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import Link from "next/link";
import { getMissionById } from "@/http/mission";
import DisplayMission from "@/components/common/DisplayMission";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import { auth } from "@/auth";
import { getFreelanceByEmail } from "@/http/freelance";
import "@/styles/Client.css";
import DisplayMissionMobile from "@/components/common/DisplayMissionMobile";

const FreelanceMissionDetailPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const mission = await getMissionById(params.slug);
  const session = await auth();
  const user = await getFreelanceByEmail(session?.user?.email!);

  // @ts-ignore
  const userType = session?.user?.type;
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection firstTitle="Appel d'offre" />

        <div className="main-content w-full display-computer">
          <DisplayMission mission={mission} userType={userType} user={user} />
        </div>

        <div className="main-content w-full display-tablet-mobile">
          <DisplayMissionMobile
            mission={mission}
            user={user}
            userType={userType}
          />
        </div>
      </main>
    </>
  );
};

export default FreelanceMissionDetailPage;
