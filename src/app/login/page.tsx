"use client";
import React, { useState } from "react";
import Image from "next/image";
import "@/styles/Login.css";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/http/user";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Formik, Field, Form } from "formik";
import TextInput from "@/components/common/FormTextInput";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const user = await getUserByEmail(values.email);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      setError("Mot de passe incorrect");
      setIsLoading(false);
      return;
    }

    if (user.type === "client") {
      setIsLoading(false);
      router.push("/client/ao");
    } else if (user.type === "freelance") {
      setIsLoading(false);
      router.push("/freelance");
    } else {
      throw new Error("Unknown type");
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
        <div className="w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Field
                id="email"
                name="email"
                className="bg-white input-placeholder my-10 w-full py-4 px-3 "
                placeholder="Email"
                type="email"
                component={TextInput}
              />

              <Field
                id="password"
                name="password"
                className="bg-white input-placeholder my-10 w-full text-test py-4 px-3 "
                placeholder="Mot de passe"
                type="password"
                component={TextInput}
              />

              <button
                className="flex items-center justify-center py-2 mt-10 submit-button w-full rounded"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={20}/>
                ) : (
                  <>
                    <Image
                      src="connectionIcon.svg"
                      width={18}
                      height={25}
                      alt="Connection icone"
                    />
                    <span className="text-white text-bold text-sm ml-2">
                      Connexion
                    </span>
                  </>
                )}
              </button>
            </Form>
          </Formik>
        </div>

        {error && <p className="mt-10 color-red">{error}</p>}
        <Link href="#">
          <h5 className="password-forgotten font-bold my-7">
            Mot de passe oublié ?
          </h5>
        </Link>
        <h5 className="font-bold text-center">Pas encore de compte</h5>
        <Link href="/signup">
          <h3 className="text-center underline font-bold">Inscris-toi</h3>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
