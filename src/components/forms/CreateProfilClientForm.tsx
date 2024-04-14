"use client";
import React, { useState } from "react";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";
import CustomSelect from "@/components/common/CustomSelect";
import FormButton from "@/components/common/FormButton";
import "@/styles/Client.css";
import { useSession } from "next-auth/react";
import { updateClient } from "@/http/client";
import { useRouter } from "next/navigation";
import { Client } from "@/entities/client";


interface CreateProfilClientFormProps {
  client: Client;
}

const CreateProfilClientForm: React.FC<CreateProfilClientFormProps> = ({client}) => {
  const [domainName, setDomainName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const session = useSession();
  const router = useRouter();
  const handleSubmit = async () => {
    const email = session.data?.user?.email!;
    try {
     await updateClient(
        email,
        domainName,
        phoneNumber,
        address,
        postalCode,
        city,
        description
      );
      router.push("/client/create-ao")
    } catch (err) {
      console.log("err", err);
    }
  };

  const options = [
    {
      value: 10,
      label: "0-3 mois",
    },
    {
      value: 20,
      label: "3-6 mois",
    },
    {
      value: 10,
      label: "6 mois et 1 an",
    },
    {
      value: 10,
      label: "entre 1 et 2 ans",
    },
    {
      value: 10,
      label: "+2 ans",
    },
  ];
  return (
    <div>
      <div className="flex-col mt-5">
        <div className="flex my-5">
          <Image
            src="/uploadProfilClient.svg"
            width={120}
            height={120}
            alt="Photo de profil"
          />
          <div className="flex-col mt-10 ml-10">
            <h5 className="font-normal text-xl">Client</h5>
            <p className="font-light">{session.data?.user?.email}</p>
          </div>
        </div>
        <TextInput
          name="city"
          id="city"
          type="text"
          className="rounded-2xl w-8/12 lg:w-11/12"
          placeholder="Nom de domaine*"
          onChange={(e) => setDomainName(e.target.value)}
        />

        <TextInput
          name="phone"
          id="phone"
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="rounded-2xl my-4 w-8/12 lg:w-11/12"
          placeholder="Numéro de téléphone*"
        />
        <div className="w-8/12 select-profil-container rounded-2xl px-4 py-2 my-4 lg:w-11/12">
          <CustomSelect value={sector} setValue={setSector} options={options}/>
        </div>
        <TextInput
          name="address"
          id="address"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-2xl my-4 w-8/12 lg:w-11/12"
          placeholder="Adresse*"
        />
        <div className="flex w-full">
          <TextInput
            name="city"
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            className="rounded-2xl w-4/12 lg:w-5/12"
            placeholder="Ville*"
          />
          <TextInput
            name="postal code"
            id="postalcode"
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
            className="rounded-2xl w-4/12 lg:w-5/12 lg:ml-10"
            placeholder="Code postal*"
          />
        </div>
        <textarea
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          className="w-8/12 rounded-3xl select-profil-container my-5 h-48 lg:w-11/12"
        />

        <div className="w-8/12 mt-2 lg:w-11/12">
          <FormButton
            title="Sauvegarder"
            handleButtonClick={handleSubmit}
            background="linear-gradient(0deg, #D892C0, #D892C0)"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfilClientForm;
