"use client";
import React from "react";
  
interface PropositionsNavBarProps {
  status: string; // The status prop should be of type FreelanceStatus
  setStatus: React.Dispatch<React.SetStateAction<string>>; // setStatus should be a function that accepts a FreelanceStatus and returns void
}

const PropositionsNavBar:React.FC<PropositionsNavBarProps> = ({ status, setStatus }) => {
  return (
    <div className="bg-freelance flex rounded-2xl items-center justify-between w-6/12 py-5 px-10 mt-10">
      <div
        className={status == "En cours" ? "text-normal cursor-pointer underline underline-offset-24" : "text-normal cursor-pointer"}
        onClick={() => setStatus("En cours")}
      >
        AO en cours
      </div>
      <div
        className={status == "Gagné" ? "text-normal cursor-pointer underline underline-offset-24" : "text-normal cursor-pointer"}
        onClick={() => setStatus("Gagné")}
      >
        AO gagnés
      </div>
      <div
        className={status == "Perdu" ? "text-normal cursor-pointer underline underline-offset-24" : "text-normal cursor-pointer"}
        onClick={() => setStatus("Perdu")}
      >
        AO perdus
      </div>
    </div>
  );
};

export default PropositionsNavBar;
