"use client";
import { FreelanceStatus } from "@/entities/proposition";
import React from "react";

interface PropositionsNavBarProps {
  status: FreelanceStatus; // The status prop should be of type FreelanceStatus
  setStatus: React.Dispatch<React.SetStateAction<FreelanceStatus>>; // setStatus should be a function that accepts a FreelanceStatus and returns void
}

const PropositionsNavBar:React.FC<PropositionsNavBarProps> = ({ status, setStatus }) => {
  return (
    <div className="bg-freelance flex rounded-2xl items-center justify-between w-6/12 py-5 px-10 mt-10">
      <div
        className={status == FreelanceStatus.ONGOING ? "text-normal cursor-pointer underline underline-offset-23" : "text-normal cursor-pointer"}
        onClick={() => setStatus(FreelanceStatus.ONGOING)}
      >
        AO en cours
      </div>
      <div
        className={status == FreelanceStatus.WON ? "text-normal cursor-pointer underline underline-offset-23" : "text-normal cursor-pointer"}
        onClick={() => setStatus(FreelanceStatus.WON)}
      >
        AO gagnés
      </div>
      <div
        className={status == FreelanceStatus.LOST ? "text-normal cursor-pointer underline underline-offset-23" : "text-normal cursor-pointer"}
        onClick={() => setStatus(FreelanceStatus.LOST)}
      >
        AO perdus
      </div>
    </div>
  );
};

export default PropositionsNavBar;
