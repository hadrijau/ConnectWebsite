"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "@/components/common/CustomDateField";
import "@/styles/Client.css";
import { createMission } from "@/http/mission";
import FormButton from "@/components/common/FormButton";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import { lengthOptions, levelOptions, modalitiesOptions } from "@/lib/selectConstants";
import { Client } from "@/entities/client";

interface CreateMissionFormProps {
  user: Client
}
const CreateMissionForm: React.FC<CreateMissionFormProps> = ({ user }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [goals, setGoals] = useState("");
  const [date, setDate] = React.useState<Dayjs>(dayjs("2022-04-17"));
  const [price, setPrice] = React.useState(0);
  const [length, setLength] = useState(10);
  const [modalities, setModalities] = useState(10);

  const handleSubmit = async () => {
    try {
      await createMission(
        title,
        context,
        goals,
        date,
        price,
        lengthOptions.find((option) => option.value === length)!.label,
        modalitiesOptions.find((option) => option.value === modalities)!.label,
        selectedCompetences
      );
      router.push("/client/ao");
      router.refresh()
    } catch (err) {
      console.log("Error creating mission", err);
    }
  };

  const [selectedCompetences, setSelectedCompetences] = useState<
    { label: string; level: number }[]
  >([]);

  const handleSelectOption = (label: string, level: number): void => {
    setSelectedCompetences([...selectedCompetences, { label, level }]);
  };

  const removeCompetence = (index: number): void => {
    const updatedOptions = [...selectedCompetences];
    updatedOptions.splice(index, 1);
    setSelectedCompetences(updatedOptions);
  };


  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-7/12">
          <h5 className="text-light mb-3">AO 00002</h5>
          <input
            type="text"
            placeholder="Titre de la mission*"
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
          />
          <textarea
            placeholder="Contexte *"
            onChange={(e) => setContext(e.target.value)}
          ></textarea>
          <textarea
            placeholder="Missions et livrables *"
            onChange={(e) => setGoals(e.target.value)}
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
              <CustomDateField date={date} setDate={setDate} />
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
              onChange={(e) => setPrice(Number(e.target.value))}
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
            //@ts-ignore
              value={length}
              //@ts-ignore
              setValue={setLength}
              label="Durée de la mission"
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
            //@ts-ignore
              value={modalities}
              //@ts-ignore
              setValue={setModalities}
              label="Modalités"
              options={modalitiesOptions}
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
              {user.city}, {user.postalCode}
            </p>
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
              selectedCompetences={selectedCompetences.map(
                //@ts-ignore
                ({ competence }) => competence
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
                    setValue={(level) => {

                      const updatedCompetences = [...selectedCompetences];
                      //@ts-ignore
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
          title="Soumettre la mission"
          background="#D892C0"
          handleButtonClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateMissionForm;
