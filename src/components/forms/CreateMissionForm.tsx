"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "../common/CustomDateField";
import "@/styles/Client.css";
import { createMission } from "@/http/mission";
import FormButton from "../common/FormButton";

const CreateMissionForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [goals, setGoals] = useState("");
  const [date, setDate] = React.useState<Dayjs>(dayjs("2022-04-17"));
  const [price, setPrice] = React.useState(0);
  const [length, setLength] = useState(0);
  const [modalities, setModalities] = useState("test");

  const handleSubmit = async () => {
    try {
      await createMission(
        title,
        context,
        goals,
        date,
        price,
        length,
        modalities
      );
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
            <input className="price-input" onChange={(e) => setPrice(Number(e.target.value))}/>
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
            <CustomSelect value={length} setValue={setLength} />
          </div>
          <div className="flex my-2">
            <Image
              src="/modaliteTravail.svg"
              height={25}
              width={25}
              alt="calendrier"
              className="mr-4"
            />
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
