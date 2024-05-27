import SelectOptions from "@/components/freelance/SelectOptions";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import React from "react";
import { auth } from "@/auth";
import { getFreelanceByEmail } from "@/http/freelance";
const CompetencesFreelancePage = async () => {

  const session = await auth();
  const user = await getFreelanceByEmail(session?.user?.email!);
  return (
    <div className="flex min-h-screen">
      <NavBarProfile className="w-4/12 fixed overflow-y-auto min-h-screen" />
      <div className="flex-col w-8/12 content-profile">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Je suis doué(e) en ...
          </h5>
        </div>
        <SelectOptions user={user}/>
      </div>
    </div>
  );
};

export default CompetencesFreelancePage;
