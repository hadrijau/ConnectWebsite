"use client";
import React, { useState } from "react";
import { createUser, getUserByEmail, updateUser } from "@/http/user";
import { useRouter } from "next/navigation";
import { createFreelance } from "@/http/freelance";
import { createClient } from "@/http/client";
import { signIn } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

//@ts-ignore
const InformationsChoice = ({ email, firstname, lastname, password }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (type: string) => {
    setIsLoading(true);
    await createUser(email, password, firstname, lastname, type);

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (result?.error) {
      return;
    }

    if (type == "client") {
      await createClient(email, firstname, lastname);
      setIsLoading(false);
      router.push("/client/profil/espace");
    } else {
      await createFreelance(email, firstname, lastname);
      router.push("/freelance/profil");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-6/12 flex flex-col px-20">
      <h3 className="text-3xl text-normal mt-20 ml-10 mb-20 text-infos">
        Où te situes-tu ?
      </h3>

      {isLoading ? (
        <div className="flex justify-center items-center mt-40">
          <CircularProgress size={40} />
        </div>
      ) : (
        <div>
          <div
            className=" flex flex-col items-center py-10 px-5 cursor-pointer independant-signup-card"
            onClick={() => handleUpdateUser("freelance")}
          >
            <>
              <h5 className="text-semibold text-center text-2xl mb-10">
                Indépendant
              </h5>
              <p className="text-semi-bold text-xl">
                Tu recherches la mission
                <span className="independant-signup-span ml-1">
                  idéale
                </span>{" "}
                chez le client idéal.
              </p>
            </>
          </div>

          <h4 className="my-10 text-semibold text-2xl text-center">OU</h4>

          <div
            className=" flex flex-col items-center py-10 px-5 cursor-pointer client-signup-card"
            onClick={() => handleUpdateUser("client")}
          >
            <>
              <h5 className="text-bold text-center text-2xl mb-10 ">Client</h5>
              <p className="text-xl text-semi-bold">
                Vous cherchez le candidat parfait pour une mission
                <span className="client-signup-span ml-1">donnée</span>.
              </p>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationsChoice;
