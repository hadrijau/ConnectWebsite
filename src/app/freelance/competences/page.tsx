import SelectOptions from "@/components/freelance/SelectOptions";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import React from "react";
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
        <SelectOptions />
      </div>
    </div>
  );
};

export default CompetencesFreelancePage;
