"use client";
import React, { useState } from "react";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";
import CustomSelect from "@/components/common/CustomSelect";
import FormButton from "@/components/common/FormButton";
import "@/styles/Client.css";

const CreateProfilClientForm = () => {
  const [client, setClient] = useState("");
  const [sector, setSector] = useState("");
  const options = ["Test1", "Test2"]
  return (
    <div>
      <div className="flex-col mt-5 ml-20">
        <h1 className="font-bold text-3xl font-pink">Mon espace</h1>
        <h5 className="font-normal text-xl mt-5">On fait connaissance ?</h5>
        <div className="flex my-5">
          <Image
            src="/uploadProfilClient.svg"
            width={120}
            height={120}
            alt="Photo de profil"
          />
          <div className="flex-col mt-10 ml-10">
            <h5 className="font-normal text-xl">Client</h5>
            <p className="font-light">adresseemail@grouperhapsodie.fr</p>
          </div>
        </div>
        <div className="w-8/12 select-profil-container rounded-full px-4 py-2">
          <CustomSelect
            value={client}
            setValue={setClient}
            label="Quel client"
          />
        </div>

        <TextInput
          name="phone"
          id="phone"
          type="text"
          className="rounded-full my-4 w-8/12"
          placeholder="Numéro de téléphone*"
        />
        <div className="w-8/12 select-profil-container rounded-full px-4 py-2 my-4">
          <CustomSelect value={sector} setValue={setSector} label="Secteur" options={options}/>
        </div>
        <TextInput
          name="address"
          id="address"
          type="text"
          className="rounded-full my-4 w-8/12"
          placeholder="Adresse*"
        />
        <div className="flex w-full">
          <TextInput
            name="city"
            id="city"
            type="text"
            className="rounded-full w-4/12 "
            placeholder="Ville*"
          />
          <TextInput
            name="postal code"
            id="postalcode"
            type="text"
            className="rounded-full w-4/12"
            placeholder="Code postal*"
          />
        </div>
        <textarea
          placeholder="Description..."
          className="w-8/12 rounded-3xl select-profil-container my-5 h-48"
        />

        <div className="w-8/12 mt-2">
          <FormButton
            title="Sauvegarder"
            background="linear-gradient(0deg, #D892C0, #D892C0)"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfilClientForm;
