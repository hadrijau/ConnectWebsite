import React from "react";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import ClientNavbar from "@/components/navbar/ClientNavbar";
import CreateMissionForm from "@/components/forms/CreateMissionForm";
import { auth } from "@/auth";
import Link from "next/link";
import "@/styles/Client.css";
import { getClientByEmail } from "@/http/client";
import ClientIntroSection from "@/components/common/ClientIntroSection";

const ClientMissionsPage = async () => {

  return (
    <>
      <ClientNavbar />
      <main className="flex flex-col items-center justify-between">
        <ClientIntroSection
          firstTitle="Missions"
          undertitle="Je gère toutes les missions au sein de mon entreprise"
        />
      </main>
    </>
  );
};

export default ClientMissionsPage;
