"use client";
import React, { useState } from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import PropositionsNavBar from "@/components/freelance/PropositionsNavBar";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Mission, { Proposition } from "@/entities/mission";
import { getMissionById } from "@/http/mission";

interface AODisplayProps {
  propositions: Proposition[];
}

const AODisplay: React.FC<AODisplayProps> = ({ propositions }) => {
  const [status, setStatus] = useState("Gagné");

  return (
    <div>
      <FreelanceAoNavbar />
      <div className="flex justify-center">
        <PropositionsNavBar status={status} setStatus={setStatus} />
      </div>
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-full">
          {propositions.map(async (proposition, index) => {
            const mission: Mission = await getMissionById(
              proposition.missionId
            );
            const { freelanceProposedPrice } = proposition;
            return (
              <AOFreelanceCard
                key={index}
                clientProposedPrice={mission.price}
                freelanceProposedPrice={freelanceProposedPrice}
                title={mission.title}
                city={mission.city}
                modalities={mission.modalities}
                date={mission.date}
                companyLogo={"/logoSoge.svg"}
                companyName={"Company B"}
                length={mission.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AODisplay;
