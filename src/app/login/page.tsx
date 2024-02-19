"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import "@/styles/Login.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter()
  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log("values", values)
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (!result?.error) {
      router.push("/freelance")
    }
  };

  return (
    <div className="login-container p-4 flex flex-col justify-center items-center">
      <Image
        src="login.svg"
        height={500}
        width={500}
        className="login-img"
        alt="Connection à connect"
      />

      <div className="form-container w-5/12 flex flex-col items-center py-4 px-10 justify-center">
        <Image
          src="logoWithConnect.svg"
          alt="Logo Connect avec le nom"
          width={180}
          height={180}
        />
        <h1 className="text-bold mb-20 text-3xl">
          Connectez-vous à votre compte
        </h1>
        <LoginForm handleSubmit={handleSubmit} />

        <h5 className="password-forgotten font-bold my-20">
          Mot de passe oublié ?
        </h5>
      </div>
    </div>
  );
};

export default LoginPage;
