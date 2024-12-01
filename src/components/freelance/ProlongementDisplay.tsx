import React from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import AOFreelanceCard from "@/components/freelance/AOFreelanceCard";
import Mission from "@/entities/mission";

interface ProlongementDisplayProps {
  approvedMissions: Mission[];
}

const ProlongementDisplay: React.FC<ProlongementDisplayProps> = ({
  approvedMissions,
}) => {
  return (
    <div>
      <FreelanceAoNavbar />
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-full">
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
      </div>
    </div>
  );
};

export default ProlongementDisplay;
