import TextInput from "@/components/common/TextInput";
import NavBarProfile from "@/components/profile/NavBarProfile";
import React from "react";
import Image from "next/image";

const ProfileFreelancePage = () => {
  return (
    <div className="flex h-screen">
      <NavBarProfile className="w-4/12 h-screen"/>
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">Bienvenue dans ma vie</h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-bold text-3xl font-green">Mon profil</h1>
          <h5 className="font-normal text-xl mt-5">On fait connaissance ?</h5>
        <div className="flex my-5">
            <Image src="/upload_profil.svg" width={150} height={150} alt="Photo de profil" />
            <div className="flex-col mt-10 ml-10">
                <h5 className="font-normal text-xl">Prénom Nom</h5>
                <p className="font-light">adresseemail@grouperhapsodie.fr</p>
            </div>
        </div>
          <TextInput
            name="job"
            id="job"
            className="rounded-full my-4 w-10/12"
            type="text"
            placeholder="Vous êtes* (exemple : chargée de communication interne)"
          />
          <TextInput
            name="phone"
            id="phone"
            type="text"
            className="rounded-full my-4 w-10/12"
            placeholder="Numéro de téléphone*"
          />
          <TextInput
            name="mission"
            id="mission"
            type="text"
            className="rounded-full my-4 w-10/12"
            placeholder="Dernière mission*"
          />
          <TextInput
            name="length"
            id="length"
            type="text"
            className="rounded-full my-4 w-10/12"
            placeholder="Durée de mission souhaitée"
          />
          <TextInput
            name="description"
            id="description"
            type="text"
            placeholder="Description..."
            textarea={true}
            className="h-40 rounded-3xl w-10/12"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFreelancePage;
