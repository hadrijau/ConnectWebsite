import React from "react";
import Image from "next/image";
import "@/styles/Informations.css";
import InformationsChoice from "@/components/informations/InformationsChoice";
import { auth } from "@/auth";

const InformationsPage = async () => {
  
  const session = await auth();

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
      <InformationsChoice session={session}/>

    </div>
  );
};

export default InformationsPage;
