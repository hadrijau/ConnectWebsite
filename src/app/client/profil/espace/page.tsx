import React from "react";
import CreateProfilClientForm from "@/components/forms/CreateProfilClientForm";
import NavBarProfileClient from "@/components/profile/NavBarProfileClient";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { getClientByEmail } from "@/http/client";

const ProfileClientPage = async () => {
  const session = await auth();
  const user = await getClientByEmail(session?.user?.email!);
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <NavBarProfileClient className="w-4/12" />
        <div className="flex-col w-8/12 ml-20">
          <div className="flex justify-end">
            <h5 className="font-bad-script text-2xl mt-10 mr-10">
              Bienvenue chez nous
            </h5>
          </div>

          <h1 className="font-bold text-3xl font-pink">Mon espace</h1>
          <h5 className="font-normal text-xl mt-5">On fait connaissance ?</h5>
          <CreateProfilClientForm client={user}/>
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProfileClientPage;
