import React from "react";
import CreateProfilClientForm from "@/components/forms/CreateProfilClientForm";
import NavBarProfileClient from "@/components/profile/NavBarProfileClient";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { getClientByEmail } from "@/http/client";
import { redirect } from "next/navigation";

const ProfileClientPage = async () => {
  const session = await auth();

  const handleSignOut = () => {
    redirect("/login");
  };
  if (!session || !session.user || !session.user.email) {
    handleSignOut();
    return;
  } 
  const user = await getClientByEmail(session.user.email);

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <NavBarProfileClient className="navbar-container" user={user}/>
        <div className="content-container">
          <div className="flex justify-end">
            <h5 className="font-bad-script text-2xl mt-10 mr-10">
              Bienvenue chez nous
            </h5>
          </div>

          <h1 className="font-bold text-3xl font-pink">Mon profil</h1>
          <h5 className="font-normal text-xl mt-5">On fait connaissance ?</h5>
          <CreateProfilClientForm client={user} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProfileClientPage;
