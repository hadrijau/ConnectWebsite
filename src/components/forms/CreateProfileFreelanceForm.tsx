"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import FormButton from "@/components/common/FormButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateFreelance } from "@/http/freelance";
import { Client } from "@/entities/client";

interface CreateProfileFreelanceFormProps {
  user: Client;
}

const CreateProfileFreelanceForm: React.FC<CreateProfileFreelanceFormProps> = ({ user }) => {
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [lastMission, setLastMission] = useState("");
  const [desiredMissionLength, setDesiredMissionLength] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleDataSave = async () => {
    try {
      await updateFreelance(
        user.email,
        title,
        phone,
        lastMission,
        desiredMissionLength,
        description
      );
      router.push("/freelance/competences");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div>
      <div className="flex my-5">
        <Image
          src="/upload_profil.svg"
          width={150}
          height={150}
          alt="Photo de profil"
        />
        <div className="flex-col mt-10 ml-10">
          <h5 className="font-normal text-xl">
            {user.firstname} {user.lastname}
          </h5>
          <p className="font-light">{user.email}</p>
        </div>
      </div>
      <TextInput
        name="job"
        id="job"
        className="rounded-full my-4 w-10/12"
        type="text"
        placeholder="Vous êtes* (exemple : chargée de communication interne)"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextInput
        name="phone"
        id="phone"
        type="text"
        className="rounded-full my-4 w-10/12"
        placeholder="Numéro de téléphone*"
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextInput
        name="mission"
        id="mission"
        type="text"
        className="rounded-full my-4 w-10/12"
        placeholder="Dernière mission*"
        onChange={(e) => setLastMission(e.target.value)}
      />
      <TextInput
        name="length"
        id="length"
        type="text"
        className="rounded-full my-4 w-10/12"
        placeholder="Durée de mission souhaitée"
        onChange={(e) => setDesiredMissionLength(e.target.value)}
      />
      <TextInput
        name="description"
        id="description"
        type="text"
        placeholder="Description..."
        textarea={true}
        className="h-40 rounded-3xl w-10/12"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="w-10/12 mt-4">
        <FormButton
          title="Sauvegarder"
          handleButtonClick={handleDataSave}
          background="linear-gradient(0deg, #B9D386, #B9D386)"
        />
      </div>
    </div>
  );
};

export default CreateProfileFreelanceForm;
