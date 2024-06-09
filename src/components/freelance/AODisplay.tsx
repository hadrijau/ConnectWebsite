"use client";
import React, { useState } from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import PropositionsNavBar from "@/components/freelance/PropositionsNavBar";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Proposition, { FreelanceStatus } from "@/entities/proposition";

interface AODisplayProps {
  propositions: Proposition[];
}

const AODisplay: React.FC<AODisplayProps> = ({ propositions }) => {

  const [status, setStatus] = useState(FreelanceStatus.ONGOING);

  return (
    <div>
      <FreelanceAoNavbar />
      <div className="flex justify-center">
        <PropositionsNavBar status={status} setStatus={setStatus}/>
      </div>
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-full">
          {propositions.map((proposition, index) => {
            const {
              freelanceId,
              clientProposedPrice,
              freelanceProposedPrice,
              title,
              clientDisponibility,
              length,
              city,
              modalities,
            } = proposition;
            return (
              <AOFreelanceCard
                key={index}
                clientProposedPrice={clientProposedPrice}
                freelanceProposedPrice={freelanceProposedPrice}
                title={title}
                city={city}
                modalities={modalities}
                date={clientDisponibility}
                companyLogo={"/logoSoge.svg"}
                companyName={"Company B"}
                length={length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AODisplay;
