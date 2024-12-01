import React, { Suspense } from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

const ClientCreateAOPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  } 

  const user = await getClientByEmail(session.user.email);


  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes appels d'offre"
          undertitle="Je gère mes appels d’offres en les ajoutant, en les supprimant ou en les modifiant."
        />

        <Suspense fallback={<Loading />}>
          {user && (
            <div className="main-content w-full">
              <CreateMissionForm user={user} />
            </div>
          )}
        </Suspense>
      </main>
    </>
  );
};

export default ClientCreateAOPage;
