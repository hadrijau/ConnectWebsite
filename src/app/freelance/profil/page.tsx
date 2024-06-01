import React from "react";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import { auth } from "@/auth";
import { getFreelanceByEmail } from "@/http/freelance";
import CreateProfileFreelanceForm from "@/components/forms/CreateProfileFreelanceForm";

const ProfileFreelancePage = async () => {

  const session = await auth();
  const user = await getFreelanceByEmail(session?.user?.email!);

  return (
    <div className="flex min-h-screen">
      <NavBarProfile className="w-4/12" />
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Bienvenue dans ma vie
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20">
          <h1 className="font-semibold text-3xl font-green">Mon profil</h1>
          <h5 className="font-normal text-xl mt-5">On fait connaissance ?</h5>
          <CreateProfileFreelanceForm user={user}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileFreelancePage;
