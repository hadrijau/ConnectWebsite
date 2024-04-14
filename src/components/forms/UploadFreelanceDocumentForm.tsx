"use client";
import React, { useState } from "react";
import "@/styles/components/NavLink.css";
import FormButton from "@/components/common/FormButton";

const UploadFreelanceDocumentForm = () => {
  const [document, setDocument] = useState("KBIS");

  return (
    <div className="w-full px-20 mt-10 flex flex-col justify-center">
      <div className="flex justify-between">
        <p
          onClick={() => setDocument("KBIS")}
          className={
            document === "KBIS"
              ? "link-active-freelance cursor-pointer"
              : "nav-link-freelance cursor-pointer"
          }
        >
          KBIS
        </p>
        <p
          onClick={() => setDocument("Contrat")}
          className={
            document === "Contrat"
              ? "link-active-freelance cursor-pointer"
              : "nav-link-freelance cursor-pointer"
          }
        >
          Contrat
        </p>
        <p
          onClick={() => setDocument("Attestation de vigilance")}
          className={
            document === "Attestation de vigilance"
              ? "link-active-freelance cursor-pointer"
              : "nav-link-freelance cursor-pointer"
          }
        >
          Attestation de vigilance
        </p>
        <p
          onClick={() => setDocument("Bulletins de salaire")}
          className={
            document === "Bulletins de salaire"
              ? "link-active-freelance cursor-pointer"
              : "nav-link-freelance cursor-pointer"
          }
        >
          Bulletins de salaire
        </p>
      </div>

      <div className="w-2/12 self-center lg:w-5/12">
        <FormButton
          title="+ Dépose le ici"
          background="#B9D38680"
          textClassName="text-black"
          className="inline-block mt-10"
        />
      </div>
    </div>
  );
};

export default UploadFreelanceDocumentForm;
