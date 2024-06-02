"use client";
import React, { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import "@/styles/Freelance.css";
import { useRouter } from "next/navigation";
import Freelance from "@/entities/freelance";
import CircularProgress from "@mui/material/CircularProgress";
import "@/styles/components/SelectOptions.css";
interface SelectOptionsProps {
  user: Freelance;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ user }) => {
  const router = useRouter();
  let competences: { label: string; level: number }[];
  if (user.competences) {
    competences = user.competences;
  } else {
    competences = [];
  }

  const [selectedCompetences, setSelectedCompetences] =
    useState<{ label: string; level: number }[]>(competences);

  const handleSelectOption = (option: {
    label: string;
    level: number;
  }): void => {
    setSelectedCompetences([
      ...selectedCompetences,
      { label: option.label, level: 0 },
    ]);
  };

  const removeCompetence = (option: { label: string; level: number }): void => {
    const updatedOptions = selectedCompetences.filter(
      (selectedCompetence) => selectedCompetence.label !== option.label
    );
    setSelectedCompetences(updatedOptions);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleCompetencesSubmit = async () => {
    setIsLoading(true);
    if (selectedCompetences.length < 5) {
      setError("Sélectionne 5 compétences minimum");
      setIsLoading(false);
      return;
    }
    const updatedFreelance = new Freelance({
      email: user.email,
      title: user.title,
      phone: user.phone,
      lastMission: user.lastMission,
      lengthMissionWanted: user.lengthMissionWanted,
      descriptionMissionWanted: user.descriptionMissionWanted,
      profilePicture: user.profilePicture,
      enterprise: user.enterprise,
      competences: selectedCompetences,
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      experiences: user.experiences,
      cv: user.cv
    });
    await updatedFreelance.update();
    router.push("/freelance/profil/experiences");
    setIsLoading(false);
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
        5 compétences pour te faire remarquer.
      </p>

      <div className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12">
        <div className="w-12/12">
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

        {error && <p className="error">{error}</p>}

        <div className="flex-col flex">
          {selectedCompetences.map((competence) => (
            <div
              key={competence.label}
              className="competence-select-container rounded-xl px-5 py-2 flex-row mt-5 mx-3 inline w-5/12"
            >
              <span>
                <span
                  className="mr-3 text-xl cursor-pointer"
                  onClick={() => removeCompetence(competence)}
                >
                  x
                </span>
                {competence.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <button
              type="submit"
              onClick={handleCompetencesSubmit}
              className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
              style={{ background: "rgba(185, 211, 134, 0.5)" }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
