"use client";
import React, { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import FormButton from "@/components/common/FormButton";
import "@/styles/Freelance.css";
import { useRouter } from "next/navigation";

const SelectOptions = () => {
  const router = useRouter();
  const [selectedCompetences, setSelectedCompetences] = useState<string[]>([]);

  const handleSelectOption = (option: string): void => {
    setSelectedCompetences([...selectedCompetences, option]);
  };

  const removeCompetence = (option: string): void => {
    const updatedOptions = selectedCompetences.filter(
      (selectedCompetence) => selectedCompetence !== option
    );
    setSelectedCompetences(updatedOptions);
  };

  return (
    <div className="flex-col mt-5 ml-20">
      <h1 className="font-bold text-3xl font-green">Mes compétences</h1>
      <h5 className="font-normal text-2xl mt-5">
        Tu as des facultés dans certains domaines ? <br />
        Sélectionne-les.
      </h5>

      <p className="my-10">
        <span className="font-bold">Astuce CONNECT: </span>Sélectionne au moins
        2 compétences pour te faire remarquer.
      </p>

      <div className="w-9/12">
        <SearchBar
          createMission={false}
          onSelectOption={handleSelectOption}
          //@ts-ignore
          setSelectedCompetences={setSelectedCompetences}
          //@ts-ignore
          selectedCompetences={selectedCompetences}
          placeholder="Ecriture, UX Design, Communication, Pack Office ..."
        />
      </div>

      {selectedCompetences.map((competence) => (
        <div
          key={competence}
          className="competence-container rounded-xl px-5 py-2 flex flex-row mt-5 mx-3"
        >
          <span>
            <span
              className="mr-3 text-xl cursor-pointer"
              onClick={() => removeCompetence(competence)}
            >
              x
            </span>
            {competence}
          </span>
        </div>
      ))}

      <div style={{ height: "25rem" }}></div>
      <div className="w-6/12 ml-20">
        <Link href="/freelance/experiences">
          <FormButton
            title="Sauvegarder"
            background="linear-gradient(0deg, #B9D386, #B9D386)"
            handleButtonClick={() => router.push("/freelance/experiences")}
          />
        </Link>
      </div>
    </div>
  );
};

export default SelectOptions;
