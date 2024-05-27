import React from "react";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import CreateFreelanceExperienceForm from "@/components/forms/CreateFreelanceExperienceForm";

const ExperienceFreelancePage = () => {
  return (
    <div className="flex min-h-screen">
      <NavBarProfile className="w-4/12 fixed overflow-y-auto min-h-screen" />
      <div className="flex-col w-8/12 content-profile">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Mes aventures passées
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-bold text-3xl font-green">Mes expériences</h1>
          <h5 className="font-normal text-xl mt-5">
            Raconte nous ton histoire ...
          </h5>

          <p className="my-10">
            <span className="font-bold">Astuce CONNECT: </span>Ajoute les
            expériences les plus significatives pour valoriser ton profil.
          </p>

          <CreateFreelanceExperienceForm />
        </div>
      </div>
    </div>
  );
};

export default ExperienceFreelancePage;
