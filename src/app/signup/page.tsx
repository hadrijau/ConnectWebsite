"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignupForm from "@/components/forms/SignupForm";
import "@/styles/Signup.css";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/http/user";

const SignupPage = () => {
  const router = useRouter();
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };
  const [userExists, setUserExists] = useState(false);

  const handleSubmit = async (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accept: boolean;
  }) => {
    try {
      const result = await getUserByEmail(values.email);
      if (result) {
        setUserExists(true);
      } else {
        router.push(
          "/informations" +
            "?" +
            createQueryString("email", values.email) +
            "?" +
            values.firstname +
            "?" +
            values.lastname +
            "?" +
            values.password
        );
      }
    } catch (err) {
      console.log("Error in signup", err);
    }
    console.log("Submitted with values:", values);
  };
  return (
    <div className="flex h-screen">
      <div className="w-6/12 flex flex-col px-20 py-10 3md:px-10 md:w-full md:justify-between md:pt-10 md:pb-0">
        <Image
          src="logoWithConnect.svg"
          alt="Connect logo"
          width={120}
          className="mb-5"
          height={100}
          onClick={() => router.push("/")}
        />
        <h1 className="text-3xl mb-10 text-normal">Inscription</h1>

        <SignupForm handleSubmit={handleSubmit} userExists={userExists} />
        <div className=" hidden md:flex md:justify-center md:items-center md:w-fill md:h-96 md:relative">
          <Image src="signup2.svg" alt="Equipe connect" layout="fill" />
        </div>
      </div>
      <div className="w-6/12 flex flex-col join-connect overflow-hidden md:hidden">
        <h3 className="text-3xl text-normal mt-20 ml-10 mb-20">
          Rejoins la team Connect
        </h3>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="signup1.svg"
            alt="Rejoignez connect"
            width={350}
            height={100}
            className="image-signup mb-10"
          />
          <div className="image-container">
            <Image
              src="signup2.svg"
              alt="Equipe connect"
              width={0}
              height={0}
              style={{ width: "90%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
