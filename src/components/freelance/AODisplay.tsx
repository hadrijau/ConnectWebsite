"use client";
import React, { useState } from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import PropositionsNavBar from "@/components/freelance/PropositionsNavBar";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Mission from "@/entities/mission";

interface AODisplayProps {
  approvedMissions: Mission[];
  pendingMissions: Mission[];
  likedMissions: Mission[];
  lostMissions: Mission[];
}

const AODisplay: React.FC<AODisplayProps> = ({
  approvedMissions,
  pendingMissions,
  likedMissions,
  lostMissions,
}) => {
  const [status, setStatus] = useState("En cours");

  return (
    <div>
      <FreelanceAoNavbar />
      <div className="flex justify-center">
        <PropositionsNavBar status={status} setStatus={setStatus} />
      </div>
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-full">
          {status === "Gagné" && (
            <div>
              {approvedMissions.map((mission, index) => (
                <AOFreelanceCard
                  key={index}
                  clientProposedPrice={mission.price}
                  title={mission.title}
                  city={mission.city}
                  modalities={mission.modalities}
                  date={mission.date}
                  companyLogo={"/logoSoge.svg"}
                  companyName={"Company A"}
                  length={mission.length}
                />
              ))}
            </div>
          )}

          {status === "En cours" && (
            <div>
              {pendingMissions.map((mission, index) => (
                <AOFreelanceCard
                  key={index}
                  clientProposedPrice={mission.price}
                  title={mission.title}
                  city={mission.city}
                  modalities={mission.modalities}
                  date={mission.date}
                  companyLogo={"/logoSoge.svg"}
                  companyName={"Company A"}
                  length={mission.length}
                />
              ))}
            </div>
          )}

          {status === "Perdu" && (
            <div>
              {lostMissions.map((mission, index) => (
                <AOFreelanceCard
                  key={index}
                  clientProposedPrice={mission.price}
                  title={mission.title}
                  city={mission.city}
                  modalities={mission.modalities}
                  date={mission.date}
                  companyLogo={"/logoSoge.svg"}
                  companyName={"Company A"}
                  length={mission.length}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AODisplay;
