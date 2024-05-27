"use client";
import React, { useState } from "react";
import Image from "next/image";
import Mission from "@/entities/mission";
import CompetencesContainer from "../common/CompetencesContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface DisplayMissionProps {
  mission: Mission;
}

const DisplayMission: React.FC<DisplayMissionProps> = ({ mission }) => {
  const [modify, setModify] = useState(false);
  const router = useRouter()
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <Link href="/client/ao">
          <h5 className="mb-10">&#60;- retour aux appels d&apos;offres</h5>
        </Link>
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

            <div className="flex items-center justify-center">
              <button
                className="my-12 py-5 px-10 submit-button rounded-2xl bg-client"
                type="submit"
              >
                <span className="text-xl text-normal ml-2 mr-2">
                  Besoin d&apos;aide pour trouver la personne idéale ?
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col w-4/12">
            <Image
              src="/clientMissionModify.svg"
              height={25}
              width={25}
              alt="modification"
              className="img-modification justify-end"
              onClick={() => router.push(`/client/ao/modify/${mission._id}`)}
            />
            <div className="flex my-2">
              <Image
                src="/calendrier.svg"
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
                src="/tarifHT.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <p className="mt-2">{mission.price} € HT/jour</p>
            </div>
            <div className="flex my-2">
              <Image
                src="/dureeMission.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {mission.length}
            </div>
            <div className="flex my-2">
              <Image
                src="/modaliteTravail.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {mission.modalities}
            </div>

            <CompetencesContainer competences={mission.competences} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMission;
