import React from "react";
import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";

export default async function FreelanceSettingsPage() {
  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <p>Paramètres</p>
      </main>
    </>
  );
}
