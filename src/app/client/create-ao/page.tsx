import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import Link from "next/link";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";

const ClientPage = async () => {
  const session = await auth();
  const user = await getClientByEmail(session?.user?.email!);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <FreelanceIntroSection
          firstTitle="Mon appel d'offres"
          background="linear-gradient(94deg, rgba(216, 146, 192, 0.65) 0%, rgba(121, 179, 209, 0.65) 99.73%)"
        />

        <div className="flex justify-between w-full px-40 mt-10 flex-col lg:px-10">
          <Link href="/client/ao">
            <h5 className="mb-20">&#60;- retour</h5>
          </Link>
          <CreateMissionForm user={user}/>
        </div>
      </main>
    </>
  );
};

export default ClientPage;
