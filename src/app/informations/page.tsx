import React from "react";
import Image from "next/image";
import "@/styles/Informations.css";
import InformationsChoice from "@/components/informations/InformationsChoice";

//@ts-ignore
const InformationsPage = async ({ searchParams }) => {
  const email = searchParams.email.split("?")[0];
  const firstname = searchParams.email.split("?")[1];
  const lastname = searchParams.email.split("?")[2];
  const password = searchParams.email.split("?")[3];

  return (
    <div className="flex min-h-screen">
      <div className="w-6/12 flex flex-col join-connect overflow-hidden">
        <h3 className="text-3xl text-normal mt-20 ml-10 mb-20">
          Plutôt team indep ou team client ?
        </h3>
        <div className="flex flex-col items-center justify-center w-full h-full relative">
          <div className="image-container">
            <Image
              src="/signup.svg"
              alt="Equipe connect"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <InformationsChoice email={email} firstname={firstname} lastname={lastname} password={password} />
    </div>
  );
};

export default InformationsPage;
