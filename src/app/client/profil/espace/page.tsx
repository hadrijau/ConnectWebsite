import React from "react";
import CreateProfilClientForm from "@/components/forms/CreateProfilClientForm";
import NavBarProfileClient from "@/components/profile/NavBarProfileClient";

const ProfileClientPage = () => {
  return (
    <div className="flex h-screen">
      <NavBarProfileClient className="w-4/12 h-screen" />
      <div className="flex-col w-8/12">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Bienvenue chez nous
          </h5>
        </div>
      <CreateProfilClientForm />
      </div>
    </div>
  );
};

export default ProfileClientPage;
