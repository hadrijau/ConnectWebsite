import TextInput from "@/components/common/TextInput";
import NavBarProfile from "@/components/profile/NavBarProfile";
import React from "react";
import SearchBar from "@/components/common/SearchBar";

const CompetencesFreelancePage = () => {
  return (
    <div className="flex h-screen">
      <NavBarProfile className="w-4/12 h-screen" />
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Je suis doué(e) en ...
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-bold text-3xl font-green">Mes compétences</h1>
          <h5 className="font-normal text-2xl mt-5">
            Tu as des facultés dans certains domaines ? <br />
            Sélectionne-les.
          </h5>

          <p className="my-10">
            <span className="font-bold">Astuce CONNECT: </span>Sélectionne au
            moins 2 compétences pour te faire remarquer.
          </p>

          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default CompetencesFreelancePage;
