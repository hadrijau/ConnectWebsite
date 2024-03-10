import React from "react";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import EntrepriseFreelanceForm from "@/components/forms/EntrepriseFreelanceForm";

const EntrepriseFreelancePage = () => {
  return (
    <div className="flex h-screen">
      <NavBarProfile className="w-4/12 h-screen" />
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Work in progress
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-bold text-3xl font-green">Mon entreprise</h1>
          <h5 className="font-normal text-xl mt-5">
            Encore un petit effort ...
          </h5>

          <p className="my-10">
            <span className="font-bold">Tu es déjà dans une entreprise ? Indique nous laquelle ! </span>
          </p>

          <EntrepriseFreelanceForm />
        </div>
      </div>
    </div>
  );
};

export default EntrepriseFreelancePage;
