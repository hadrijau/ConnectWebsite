"use client";
import React, { useState } from "react";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Mission from "@/entities/mission";
import MissionNavBar from "./MissionNavBar";
import AOFreelanceCardMobile from "@/components/freelance/AOFreelanceCardMobile";

interface MissionsDisplayProps {
  approvedMissions: Mission[];
}

const MissionsDisplay: React.FC<MissionsDisplayProps> = ({
  approvedMissions,
}) => {
  const [status, setStatus] = useState("En cours");

  return (
    <div className="w-9/12 3md:w-full">
      <MissionNavBar status={status} setStatus={setStatus} />
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-full">
          {status === "En cours" && (
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

          {status === "Passé" && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default MissionsDisplay;
