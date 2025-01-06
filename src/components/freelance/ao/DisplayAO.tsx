import Freelance from "@/entities/freelance";
import Mission from "@/entities/mission";
import React from "react";
import CardMission from "@/components/freelance/CardMission";
import CardMissionMobile from "@/components/freelance/CardMissionMobile";
import ConnectAOPresentation from "@/components/common/ConnectAOPresentation";

interface DisplayAOProps {
    missions: Mission[];
    freelance: Freelance;
}

const DisplayAO:React.FC<DisplayAOProps> = ({missions, freelance}) => {
  return (
    <div className="flex justify-between w-full sm:flex-col">
      <div className="flex-col w-7/12 lg:w-8/12 md:w-7/12 sm:w-full">
        {missions.map((mission, index) => {
          const { propositions } = mission;
          let propositionsLength = 0;
          if (propositions && propositions.length != 0) {
            propositionsLength = propositionsLength;
          }
          return (
            <div key={index}>
              <div className="display-computer">
                <CardMission
                  key={index}
                  mission={mission}
                  freelance={freelance}
                />
              </div>

              <div className="display-tablet-mobile">
                <CardMissionMobile
                  key={index}
                  mission={mission}
                  freelance={freelance}
                />
              </div>
            </div>
          );
        })}
      </div>

      <ConnectAOPresentation />
    </div>
  );
};

export default DisplayAO;
