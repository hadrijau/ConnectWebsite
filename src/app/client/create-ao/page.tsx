import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import Link from "next/link";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientCreateAOPage = async () => {
  const session = await auth();
  const user = await getClientByEmail(session?.user?.email!);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection firstTitle="" />

        <div className="main-content w-full mt-10">
          <CreateMissionForm user={user} />
        </div>
      </main>
    </>
  );
};

export default ClientCreateAOPage;
