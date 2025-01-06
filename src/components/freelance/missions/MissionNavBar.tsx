"use client";
import React from "react";
  
interface MissionNavBarProps {
  status: string; // The status prop should be of type FreelanceStatus
  setStatus: React.Dispatch<React.SetStateAction<string>>; // setStatus should be a function that accepts a FreelanceStatus and returns void
}

const MissionNavBar:React.FC<MissionNavBarProps> = ({ status, setStatus }) => {
  return (
<div className="flex justify-center w-full">
  <div className="flex items-center justify-between w-9/12 md:w-full">
    <div
      className={status == "En cours" ? "text-bold font-green cursor-pointer underline underline-offset-24 sm:text-sm" : "text-normal  sm:text-sm cursor-pointer"}
      onClick={() => setStatus("En cours")}
    >
      Mes missions en cours 
    </div>
    <div
      className={status == "Passé" ? "text-bold font-green cursor-pointer underline underline-offset-24 sm:text-sm" : "text-normal cursor-pointer sm:text-sm"}
      onClick={() => setStatus("Passé")}
    >
      Mes missions passées
    </div>
  </div>
</div>
  );
};

export default MissionNavBar;
