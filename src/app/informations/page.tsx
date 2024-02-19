import React from "react";
import Image from "next/image";
import "@/styles/Informations.css";

const InformationsPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-6/12 flex flex-col join-connect overflow-hidden">
        <h3 className="text-3xl text-normal mt-20 ml-10 mb-20">
          Plutôt team indep ou team client ?
        </h3>
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <Image
            src="signup.svg"
            alt="Equipe connect"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="w-6/12 flex flex-col px-20">
        <h3 className="text-3xl text-normal mt-20 ml-10 mb-20 text-infos">
          Où vous situez vous ?
        </h3>

        <div className=" flex flex-col items-center choice-container py-10 px-5">
          <h5 className="text-semibold text-center text-2xl mb-10">
            Indépendant
          </h5>
          <p className="text-light text-xl">
            Tu recherches la mission idéale chez le client idéal.
          </p>
        </div>

        <h4 className="my-10 text-semibold text-2xl text-center">OU</h4>

        <div className=" flex flex-col items-center choice-container py-10 px-5">
          <h5 className="text-bold text-center text-2xl mb-10 ">Client</h5>
          <p className="text-xl text-light">
            Vous cherchez le candidat parfait pour une mission{" "}
            <span style={{ color: "#496822" }}>donnée</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationsPage;
