import React, { Suspense } from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import Link from "next/link";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import Loading from "@/app/loading";

const ClientCreateAOPage = async () => {
  const session = await auth();
  const user = await getClientByEmail(session?.user?.email!);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection firstTitle="" />

        <Suspense fallback={<Loading />}>
          <div className="main-content w-full mt-10">
            <CreateMissionForm user={user} />
          </div>
        </Suspense>
      </main>
    </>
  );
};

export default ClientCreateAOPage;
