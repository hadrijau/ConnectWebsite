"use client";
import React from "react";
import Image from "next/image";
import SignupForm from "@/components/forms/SignupForm";
import "@/styles/Signup.css";
import { useRouter } from "next/navigation";
import { createUser } from "@/http/user";
import { signIn } from "next-auth/react";

const SignupPage = () => {
  const router = useRouter();
  const handleSubmit = async (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accept: boolean;
  }) => {
    try {
      await createUser(
        values.email,
        values.password,
        values.firstname,
        values.lastname
      );
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      console.log("res", result)
      if (!result?.error) {
        router.push("/informations");
      }
    } catch (err) {
      console.log("Error in signup", err);
    }
    console.log("Submitted with values:", values);
  };
  return (
    <div className="flex h-screen">
      <div className="w-6/12 flex flex-col px-20 py-10">
        <Image
          src="logoWithConnect.svg"
          alt="Connect logo"
          width={120}
          className="mb-5"
          height={100}
        />
        <h1 className="text-3xl mb-10 text-normal">Inscription</h1>
        <SignupForm handleSubmit={handleSubmit} />
      </div>
      <div className="w-6/12 flex flex-col join-connect overflow-hidden">
        <h3 className="text-3xl text-normal mt-20 ml-10 mb-20">
          Rejoignez la team connect
        </h3>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="signup1.svg"
            alt="Rejoignez connect"
            width={350}
            height={100}
            className="image-signup"
          />
          <Image
            src="signup2.svg"
            alt="Equipe connect"
            width={785}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
