import TextInput from "@/components/common/TextInput";
import NavBarProfile from "@/components/profile/NavBarProfile";
import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import LongButton from "@/components/common/LongButton";

const ExperienceFreelancePage = () => {
  return (
    <div className="flex h-screen">
      <NavBarProfile className="w-4/12 h-screen" />
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Mes aventures passées
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-bold text-3xl font-green">Mes expériences</h1>
          <h5 className="font-normal text-xl mt-5">
            Raconte nous ton histoire ...
          </h5>

          <p className="my-10">
            <span className="font-bold">Astuce CONNECT: </span>Ajoute les
            expériences les plus significatives pour valoriser ton profil.
          </p>

          <div className="flex justify-between w-10/12">
            <div className="flex flex-col w-5/12">
              <p className="mb-2">Intitulé du poste*</p>
              <TextInput
                name="job"
                placeholder="Intitulé du poste"
                id="job"
                type="text"
                className="w-full rounded-2xl py-4"
              />
            </div>
            <div className="flex flex-col w-5/12">
              <p className="mb-2">Entreprise</p>
              <TextInput
                name="job"
                placeholder="Intitulé du poste"
                id="job"
                type="text"
                className="w-full rounded-2xl py-4"
              />
            </div>
          </div>

          <div className="flex justify-between w-10/12 mt-10">
            <div className="flex flex-col w-5/12">
              <p className="mb-2">Date de début*</p>
              <TextInput
                name="job"
                placeholder="Intitulé du poste"
                id="job"
                type="text"
                className="w-full rounded-2xl py-4"
              />
            </div>
            <div className="flex flex-col w-5/12">
              <p className="mb-2">Date de fin*</p>
              <TextInput
                name="job"
                placeholder="Intitulé du poste"
                id="job"
                type="text"
                className="w-full rounded-2xl py-4"
              />
            </div>
          </div>

          <div className="flex justify-center items-center w-10/12 mt-6">
            <div className="w-3/12">
              <LongButton
                title="Télcharge ton CV ici"
                background="#B9D386"
                href=""
                textClassName="text-black"
                className="w-3/12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceFreelancePage;
