"use client";
import React from "react";

const PropositionsNavBar = () => {

  return (
    <div className="bg-freelance flex rounded-2xl items-center justify-between w-6/12 py-5 px-10 mt-10">
      <div className="text-normal">
        AO en cours
      </div>
      <div  className="text-normal">
        AO gagnés
      </div>
      <div className="text-normal">
        AO perdus
      </div>
    </div>
  );
};

export default PropositionsNavBar;
