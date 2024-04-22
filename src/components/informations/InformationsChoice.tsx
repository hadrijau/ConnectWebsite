"use client";
import React from "react";
import { getUserByEmail, updateUser } from "@/http/user";
import { useRouter } from "next/navigation";
import { createFreelance } from "@/http/freelance";
import { createClient } from "@/http/client";

//@ts-ignore
const InformationsChoice = ({ session }) => {
  console.log("session", session);
  const router = useRouter();
  const handleUpdateUser = async (type: string) => {
    if (!session || !session.user || !session.user.email) {
      return;
    }

    const user = await getUserByEmail(session.user.email);

    console.log("user", user);
    if (!user) {
      return;
    }
    await updateUser(session?.user?.email, type);

    if (type == "client") {
      await createClient(user.email, user.firstname, user.lastname);
      router.push("/client/profil/espace");
    } else {
      await createFreelance(user.email, user.firstname, user.lastname);
      router.push("/freelance/profil");
    }
  };

  return (
    <div className="w-6/12 flex flex-col px-20">
      <h3 className="text-3xl text-normal mt-20 ml-10 mb-20 text-infos">
        Où te situes-tu ?
      </h3>

      <div
        className=" flex flex-col items-center py-10 px-5 cursor-pointer independant-signup-card"
        onClick={() => handleUpdateUser("freelance")}
      >
        <h5 className="text-semibold text-center text-2xl mb-10">
          Indépendant
        </h5>
        <p className="text-semi-bold text-xl">
          Tu recherches la mission
          <span className="independant-signup-span ml-1">idéale</span> chez le client
          idéal.
        </p>
      </div>

      <h4 className="my-10 text-semibold text-2xl text-center">OU</h4>

      <div
        className=" flex flex-col items-center py-10 px-5 cursor-pointer client-signup-card"
        onClick={() => handleUpdateUser("client")}
      >
        <h5 className="text-bold text-center text-2xl mb-10 ">Client</h5>
        <p className="text-xl text-semi-bold">
          Vous cherchez le candidat parfait pour une mission
          <span className="client-signup-span ml-1">donnée</span>.
        </p>
      </div>
    </div>
  );
};

export default InformationsChoice;
