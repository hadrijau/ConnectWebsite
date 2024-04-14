"use client";
import React, { useState } from "react";
import Image from "next/image";
import FormButton from "@/components/common/FormButton";
import ModifyMissionForm from "../forms/ModifyMissionForm";
import { levelOptions } from "@/lib/selectConstants";
import { Mission } from "@/entities/mission";

interface DisplayOrModifyMissionProps {
  mission: Mission
}

const DisplayOrModifyMission: React.FC<DisplayOrModifyMissionProps> = ({ mission }) => {
  const [modify, setModify] = useState(false);

  const {
    _id,
    title,
    context,
    goals,
    date,
    length,
    modalities,
    price,
    competences,
  } = mission;
  return (
    <div className="flex flex-col w-full">
      {modify ? (
        <ModifyMissionForm
          _id={_id}
          title={title}
          context={context}
          goals={goals}
          date={date}
          price={price}
          length={length}
          modalities={modalities}
          competences={competences}
          setModify={setModify}
        />
      ) : (
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
              <Image
                src="/clientMissionModify.svg"
                height={25}
                width={25}
                alt="modification"
                className="img-modification"
                onClick={() => setModify(true)}
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

              <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
                <p className="">
                  Compétences requises <span className="color-red">*</span>
                </p>
                {mission.competences && (
                  <div className="flex justify-between my-5">
                    <p className="text-sm">Compétences</p>
                    <p className="text-sm">Niveau</p>
                  </div>
                )}
                {mission.competences.map((competence, index) => (
                  <div
                    key={competence.label}
                    className="competence-container rounded-xl flex flex-row mt-2 mx-3 justify-between lg:mx-0"
                  >
                    <span className="text-sm">{competence.label}</span>
                    <div className="">
                      <span className="text-sm">
                        {
                          levelOptions.find(
                            (option) => option.value === competence.level
                          )!.label
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-4/12 my-20 lg:w-6/12">
            <FormButton
              title="Besoin d'aide pour trouver la personne idéale ?"
              background="#D892C0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOrModifyMission;
