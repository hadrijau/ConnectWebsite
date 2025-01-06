import React from "react";
import Image from "next/image";

const ConnectAOPresentation = () => {
  return (
    <div className="flex flex-col ongoing-mission-container-freelance p-10 rounded-3xl w-1/5 items-center 3md:w-3/12 3md:p-5 md:w-4/12 sm:w-full">
      <h3 className="text-2xl text-semibold mb-6">CONNECT</h3>
      <h5 className="text-center text-normal text-base">
        t’accompagne dans ta recherche d’appel d’offres. Tu trouveras ici tout
        ce que tu es venu chercher.
        <br />
        <br />
        Pour toutes questions et demandes d’informations, tu peux nous contacter
        !
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
  );
};

export default ConnectAOPresentation;
