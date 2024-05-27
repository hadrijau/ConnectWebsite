import React from "react";
import LevelDisplay from "@/components/common/LevelDisplay";
import "@/styles/Client.css";

interface CompetencesContainerProps {
  competences: { label: string; level: number }[];
  freelance?: boolean;
}

const CompetencesContainer: React.FC<CompetencesContainerProps> = ({
  competences,
  freelance,
}) => {
  return (
    <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
      <p className="text-xl text-normal">
        Compétences requises <span className="color-red">*</span>
      </p>

      <div className="flex justify-between my-5">
        <p className="text-sm">Compétences</p>
        <p className="text-sm">Niveau</p>
      </div>

      {competences.map((competence, index) => (
        <div
          key={competence.label}
          className="competence-container rounded-xl flex flex-row mt-2 mx-3 justify-between lg:mx-0"
        >
          <div className="w-6/12">
            <span className="text-sm">{competence.label}</span>
          </div>
          <div className="w-5/12 flex justify-center lg:w-7/12">
            <LevelDisplay value={competence.level} freelance={freelance}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompetencesContainer;
