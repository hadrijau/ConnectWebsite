"use client";
import React, { useEffect, useState } from "react";
import CardMission from "@/components/freelance/CardMission";
import Image from "next/image";
import Mission from "@/entities/mission";

interface RechercheDisplayProps {
  missions: Mission[];
}

const RechercheDisplay: React.FC<RechercheDisplayProps> = ({ missions }) => {
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
      <div className="relative flex w-7/12 lg:w-8/12 mt-20 mb-5 ">
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

      <div className="flex justify-between w-full">
        <div className="flex-col w-7/12 lg:w-8/12">
          {recentMissions.map((mission, index) => {
            const {
              _id,
              title,
              price,
              propositions,
              date,
              length,
              companyName,
            } = mission;
            let propositionsLength = 0;
            if (propositions && propositions.length != 0) {
              propositionsLength = propositionsLength;
            }
            return (
              <CardMission
                key={index}
                _id={_id!}
                title={title}
                propositions={propositionsLength}
                date={date}
                companyLogo={"/logoSoge.svg"}
                companyName={companyName}
                price={price}
                length={length}
              />
            );
          })}
        </div>

        <div className="flex flex-col ongoing-mission-container-freelance p-10 rounded-3xl w-1/5 items-center">
          <h3 className="text-2xl text-semibold mb-6">CONNECT</h3>
          <h5 className="text-center text-normal text-base">
            t’accompagne dans ta recherche d’appel d’offres. Tu trouveras ici
            tout ce que tu es venu chercher.
            <br />
            <br />
            Pour toutes questions et demandes d’informations, tu peux nous
            contacter !
          </h5>
          <button
            className="bg-freelance py-5 px-4 text-white rounded my-20"
            style={{ backgroundColor: "rgba(185, 211, 134, 1)" }}
          >
            Envie de discuter ?
          </button>
          <Image
            src="/ao_follow.svg"
            width={300}
            height={70}
            alt="Missions en cours"
            className="mb-5"
          />
        </div>
      </div>
    </>
  );
};

export default RechercheDisplay;
