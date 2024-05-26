import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import Link from "next/link";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientDocumentsPage = async () => {
  const session = await auth();
  const user = await getClientByEmail(session?.user?.email!);

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Mes documents officiels"
          undertitle="Je gère les documents des indépendants et de CONNECT"
        />
      </main>
    </>
  );
};

export default ClientDocumentsPage;
