import React from "react";
import CustomAutocomplete from "@/components/common/CustomAutocomplete";
import { competences as competenceList } from "@/lib/competences";
import LevelSelector from "@/components/common/LevelSelector";

interface CompetencesSelectionProps {
  competences: {
    label: string;
    level: number;
  }[];
  setCompetences: (competences: { label: string; level: number }[]) => void;
  addCompetence: () => void;
}

const CompetencesSelection: React.FC<CompetencesSelectionProps> = ({
  competences,
  setCompetences,
  addCompetence,
}) => {
  return (
    <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
      <p className=" text-xl text-normal 3md:text-lg">
        Compétences requises <span className="color-red">*</span>
      </p>

      <div className="flex mt-5 mb-5 justify-between">
        <p className="w-6/12 text-center 2lg:w-8/12">Compétences</p>
        <p className="w-5/12 text-center 2lg:w-3/12">Niveau</p>
      </div>

      {competences.map((competence, index) => {
        return (
          <div
            key={index}
            className="flex flex-row justify-between my-1 lg:mx-0"
          >
            {/* {index >= 5 && (
      <button
        className="mr-2 text-red-500"
        onClick={() => removeCompetence(competence)}
      >
        x
      </button>
    )} */}
            <div className="w-6/12 2lg:w-8/12">
              <CustomAutocomplete
                value={competence.label}
                setValue={(newValue) => {
                  const updatedCompetences = [...competences];
                  updatedCompetences[index].label = newValue || "";
                  setCompetences(updatedCompetences);
                }}
                options={competenceList}
              />
            </div>

            <div className="w-5/12 flex justify-center 2lg:w-3/12">
              <LevelSelector
                value={competence.level}
                onChange={(level) => {
                  const updatedCompetences = [...competences];
                  updatedCompetences[index].level = level;
                  setCompetences(updatedCompetences);
                }}
              />
            </div>
          </div>
        );
      })}

      <div
        className="flex justify-end mt-5 cursor-pointer"
        onClick={addCompetence}
      >
        <p className="text-normal">+ Ajoute une compétence</p>
      </div>
    </div>
  );
};

export default CompetencesSelection;
