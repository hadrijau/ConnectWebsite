"use client";
import React from "react";
import Link from "next/link";
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

    console.log("user", user)
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
        Où vous situez vous ?
      </h3>

      <div
        className=" flex flex-col items-center choice-container py-10 px-5 cursor-pointer"
        onClick={() => handleUpdateUser("freelance")}
      >
        <h5 className="text-semibold text-center text-2xl mb-10">
          Indépendant
        </h5>
        <p className="text-light text-xl">
          Tu recherches la mission idéale chez le client idéal.
        </p>
      </div>

      <h4 className="my-10 text-semibold text-2xl text-center">OU</h4>

      <div
        className=" flex flex-col items-center choice-container py-10 px-5 cursor-pointer"
        onClick={() => handleUpdateUser("client")}
      >
        <h5 className="text-bold text-center text-2xl mb-10 ">Client</h5>
        <p className="text-xl text-light">
          Vous cherchez le candidat parfait pour une mission
          <span style={{ color: "#496822" }}>donnée</span>.
        </p>
      </div>
    </div>
  );
};

export default InformationsChoice;
