import Mission from "@/entities/mission";
import React from "react";
import Image from "next/image";
import CardOnGoingMission from "@/components/freelance/CardOnGoingMission";

interface OnGoingMissionContainerProps {
  missions: Mission[];
  userType: string;
}

const OnGoingMissionContainer: React.FC<OnGoingMissionContainerProps> = ({
  missions,
  userType,
}) => {
  return (
    <div
      className={`${
        userType === "client" ? "bg-client" : "bg-freelance"
      } flex flex-col p-10 rounded-3xl w-3/12 items-center 2md:p-5 md:w-4/12 sm:w-full md:p-5`}
    >
      <Image
        src={
          userType === "client"
            ? "/clientMissionSpaceship.svg"
            : "/freelanceMissionSpaceship.svg"
        }
        width={70}
        height={70}
        alt="Missions en cours"
        className="mb-5"
      />
      <h5 className="text-center text-normal text-xl md:text-base">
        Les missions en cours...
      </h5>
      {missions.map((mission: Mission, index: number) => {
        const { title, companyName, date } = mission;
        return (
          <CardOnGoingMission
            key={index}
            title={title}
            company={companyName}
            date={date}
          />
        );
      })}
    </div>
  );
};

export default OnGoingMissionContainer;
