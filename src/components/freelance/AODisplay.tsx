"use client";
import React, { useState } from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import PropositionsNavBar from "@/components/freelance/PropositionsNavBar";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Mission from "@/entities/mission";
import AOFreelanceCardMobile from "./AOFreelanceCardMobile";

interface AODisplayProps {
  approvedMissions: Mission[];
  pendingMissions: Mission[];
  lostMissions: Mission[];
}

const AODisplay: React.FC<AODisplayProps> = ({
  approvedMissions,
  pendingMissions,
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
            <>
              <div className="display-computer">
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

              <div className="display-tablet-mobile">
                {approvedMissions.map((mission, index) => (
                  <AOFreelanceCardMobile
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
            </>
          )}

          {status === "En cours" && (
            <>
              <div className="display-computer">
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

              <div className="display-tablet-mobile">
                {pendingMissions.map((mission, index) => (
                  <AOFreelanceCardMobile
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
            </>
          )}

          {status === "Perdu" && (
            <>
              <div className="display-computer">
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

              <div className="display-tablet-mobile">
                {lostMissions.map((mission, index) => (
                  <AOFreelanceCardMobile
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AODisplay;
