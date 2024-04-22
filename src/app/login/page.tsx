"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import "@/styles/Login.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/http/user";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (values: { email: string; password: string }) => {
    const user = await getUserByEmail(values.email);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      setError("Mot de passe incorrect");
    }
    if (!result?.error) {
      router.push("/freelance");
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

      <div className="form-container w-5/12 flex flex-col items-center py-4 px-10 justify-center lg:w-7/12">
        <Image
          src="logoWithConnect.svg"
          alt="Logo Connect avec le nom"
          width={180}
          height={180}
        />
        <h1 className="text-bold mb-8 text-3xl text-center">
          Connecte-toi à ton compte
        </h1>
        <LoginForm handleSubmit={handleSubmit} />

        {error && <p className="mt-10 color-red">{error}</p>}
        <Link href="#">
          <h5 className="password-forgotten font-bold my-7">
            Mot de passe oublié ?
          </h5>
        </Link>
        <h5 className="font-bold text-center">Pas encore de compte</h5>
          <Link href="/signup"><h3 className="text-center underline font-bold">Inscris-toi</h3></Link>
          
      </div>
    </div>
  );
};

export default LoginPage;
