"use client"
import React from "react";
import Image from "next/image";
import FormButton from "@/components/common/FormButton";
import Link from "next/link";
import Mission from "@/entities/mission";
import CompetencesContainer from "@/components/common/CompetencesContainer";

interface DisplayMissionProps {
  mission: Mission;
  freelance?: boolean;
}

const DisplayMission: React.FC<DisplayMissionProps> = ({ mission, freelance }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <div className="flex-col w-7/12">
            <div className="flex items-center mb-4">
              <Image
                src="/logoSoge.svg"
                width={150}
                height={150}
                alt="Logo société générale"
              />
              <div className="flex-col ml-10">
                <h4 className="text-normal text-2xl">{mission.title}</h4>
                <h5 className="text-light mb-3 text-xl">AO 00002</h5>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="p-4 rounded context-container w-full">
                <h5 className="text-normal">Contexte</h5>
                <p className="font-light text-sm"> {mission.context}</p>
              </div>

              <div className="p-4 rounded context-container">
                <h5 className="text-normal">Missions et livrables</h5>
                <p className="font-light text-sm"> {mission.goals}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-4/12">

            <div className="flex my-2">
              <Image
                src="/freelanceMissionCalendar.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {new Date(mission.date)
                .toLocaleDateString("fr-FR")
                .replaceAll("/", ".")}
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionPrice.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <p className="mt-2">{mission.price} € HT/jour</p>
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionTime.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {mission.length}
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionPropositions.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
            </div>
            <div className="flex my-2">
                <Image
                  src="/ImageMap.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <p className="mt-1">
                  {mission.city}, {mission.postalCode}
                </p>
              </div>
              <CompetencesContainer competences={mission.competences} freelance={true}/>
          </div>
        </div>
        <div className=" flex items-center justify-center w-7/12">
          <div className="w-5/12 mb-20 mt-5">
            <Link href={`/freelance/ao/answer/${mission._id}`}>
              <FormButton
                title="Répondre"
                background="#B9D38680"
                textClassName="text-black text-semibold text-xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMission;
