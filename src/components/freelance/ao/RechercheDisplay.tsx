"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Mission from "@/entities/mission";
import Freelance from "@/entities/freelance";
import DisplayAO from "@/components/freelance/ao/DisplayAO";

interface RechercheDisplayProps {
  missions: Mission[];
  freelance: Freelance;
}

const RechercheDisplay: React.FC<RechercheDisplayProps> = ({
  missions,
  freelance,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredMissions, setFilteredMissions] = useState(missions);

  useEffect(() => {
    const filtered = missions.filter(
      (mission) =>
        mission.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        mission.companyName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredMissions(filtered);
  }, [searchInput, missions]);

  const recentMissions = filteredMissions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <div className="relative flex w-7/12 lg:w-8/12 mt-20 mb-5 md:mt-5 md:w-full">
        <input
          type="text"
          placeholder="Rechercher par titre ou entreprise"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-2 py-3 border rounded-xl w-full pl-10 focus:outline-none     "
        />
        <Image
          src="/search.svg"
          width={20}
          height={20}
          alt="Recherche"
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      <DisplayAO missions={recentMissions} freelance={freelance} />
    </>
  );
};

export default RechercheDisplay;
