"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "@/components/common/CustomDateField";
import FormButton from "@/components/common/FormButton";

import { updateMissionById } from "@/http/mission";

import "@/styles/Client.css";
import { useRouter } from "next/navigation";
import { lengthOptions, levelOptions, modalitiesOptions } from "@/lib/selectConstants";
import SearchBar from "@/components/common/SearchBar";
import { ObjectId } from "mongodb";
interface ModifyMissionFormProps {
  _id: ObjectId;
  title: string;
  context: string;
  goals: string;
  date: Date;
  price: number;
  length: string;
  modalities: string;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  competences: { label: string; level: number }[];
}

const ModifyMissionForm: React.FC<ModifyMissionFormProps> = ({
  _id,
  title,
  context,
  goals,
  date,
  price,
  length,
  modalities,
  competences,
  setModify,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContext, setNewContext] = useState(context);
  const [newGoals, setNewGoals] = useState(goals);
  const [newDate, setNewDate] = React.useState<Dayjs>(dayjs(date));
  const [newPrice, setNewPrice] = React.useState(price);
  const [newLength, setNewLength] = useState(
    lengthOptions.find((option) => option.label === length)!.label
  );
  const [newModalities, setNewModalities] = useState(
    modalitiesOptions.find((option) => option.label === modalities)!.label
  );

  const [selectedCompetences, setSelectedCompetences] = useState(competences);

  const handleSelectOption = (label: string, level: number): void => {
    setSelectedCompetences([...selectedCompetences, { label, level }]);
  };

  const removeCompetence = (index: number): void => {
    const updatedOptions = [...selectedCompetences];
    updatedOptions.splice(index, 1);
    setSelectedCompetences(updatedOptions);
  };

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await updateMissionById(
        _id,
        newTitle,
        newContext,
        newGoals,
        newDate,
        newPrice,
        newLength, 
        newModalities,
        selectedCompetences
      );
      setModify(false);
      router.refresh();
    } catch (err) {
      console.log("Error creating mission", err);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-7/12">
          <h5 className="text-light mb-3">AO 00002</h5>
          <input
            type="text"
            placeholder="Titre de la mission*"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input-title"
          />
          <textarea
            placeholder="Contexte *"
            value={newContext}
            onChange={(e) => setNewContext(e.target.value)}
          ></textarea>
          <textarea
            placeholder="Missions et livrables *"
            value={newGoals}
            onChange={(e) => setNewGoals(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col w-4/12">
          <div className="flex my-2">
            <Image
              src="/calendrier.svg"
              height={25}
              width={25}
              alt="calendrier"
              className="mr-4"
            />
            <div className="w-full">
              <CustomDateField date={newDate} setDate={setNewDate} />
            </div>
          </div>
          <div className="flex my-2">
            <Image
              src="/tarifHT.svg"
              height={25}
              width={25}
              alt="calendrier"
              className="mr-4"
            />
            <input
              className="price-input"
              onChange={(e) => setNewPrice(Number(e.target.value))}
              value={newPrice}
            />
            <p className="mt-2">€ HT/jour</p>
          </div>
          <div className="flex my-2">
            <Image
              src="/dureeMission.svg"
              height={25}
              width={25}
              alt="calendrier"
              className="mr-4"
            />
            <CustomSelect
              value={newLength}
              setValue={setNewLength}
              options={lengthOptions}
            />
          </div>
          <div className="flex my-2">
            <Image
              src="/modaliteTravail.svg"
              height={25}
              width={25}
              alt="calendrier"
              className="mr-4"
            />
            <CustomSelect
              value={newModalities}
              setValue={setNewModalities}
              options={modalitiesOptions}
            />
          </div>

          <div className="flex my-2 competences-container rounded-2xl p-6 flex-col h-96">
            <p className="mb-5">
              Compétences requises <span className="color-red">*</span>
            </p>
            <SearchBar
              createMission={true}
              onSelectOption={(competence) =>
                handleSelectOption(competence, levelOptions[0].value)
              } // Assuming the default level is the first one
              setSelectedCompetences={setSelectedCompetences}
              //@ts-ignore
              selectedCompetences={selectedCompetences.map(
                ({ label }) => label
              )}
              placeholder="UI/UX, Open Office,..."
            />
            {selectedCompetences && (
              <div className="flex justify-between mt-5">
                <p>Compétences</p>
                <p>Niveau</p>
              </div>
            )}
            {selectedCompetences.map((competence, index) => (
              <div
                key={competence.label}
                className="competence-container rounded-xl py-2 flex flex-row mt-5 mx-3 justify-between lg:mx-0"
              >
                <span>
                  <span
                    className="mr-3 text-xl cursor-pointer"
                    onClick={() => removeCompetence(index)}
                  >
                    x
                  </span>
                  {competence.label}
                </span>
                <div className="competences-select w-5/12 lg:w-7/12">
                  <CustomSelect
                  //@ts-ignore
                    value={competence.level}
                    //@ts-ignore
                    setValue={(level: number) => {
                      const updatedCompetences = [...selectedCompetences];
                      updatedCompetences[index].level = level;
                      setSelectedCompetences(updatedCompetences);
                    }}
                    options={levelOptions}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-4/12 my-20">
        <FormButton
          title="Enregistrer les modifications"
          background="#D892C0"
          handleButtonClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ModifyMissionForm;
