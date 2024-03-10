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
interface ModifyMissionFormProps {
  _id: string;
  title: string;
  context: string;
  goals: string;
  date: Dayjs;
  price: number;
  length: number;
  modalities: string;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
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
  setModify,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContext, setNewContext] = useState(context);
  const [newGoals, setNewGoals] = useState(goals);
  const [newDate, setNewDate] = React.useState<Dayjs>(dayjs(date));
  const [newPrice, setNewPrice] = React.useState(price);
  const [newLength, setNewLength] = useState(length);
  const [newModalities, setNewModalities] = useState(modalities);

  const router = useRouter()
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
        newModalities
      );
      setModify(false);
      router.refresh()
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
            <CustomSelect value={newLength} setValue={setNewLength} label="Durée de la mission"/>
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
          title="Enregistrer les modifications"
          background="#D892C0"
          handleButtonClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ModifyMissionForm;
