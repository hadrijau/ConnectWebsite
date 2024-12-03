"use client";
import React, { useState } from "react";
import Image from "next/image";
import "@/styles/Login.css";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/http/user";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Formik, Field, Form } from "formik";
import TextInput from "@/components/common/TextInput";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const isUserKnown = await getUserByEmail(values.email);
    if (!isUserKnown) {
      setIsLoading(false);
      setUserExists(false);
      return;
    }
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
      router.push("/client");
      setIsLoading(false);
    } else if (user.type === "freelance") {
      router.push("/freelance");
      setIsLoading(false);
    } else {
      throw new Error("Unknown type");
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Adresse email incorrecte")
      .required("L'email est obligatoire"),
  });

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
        <Link href="/">
          <Image
            src="logoWithConnect.svg"
            alt="Logo Connect avec le nom"
            width={180}
            height={180}
          />
        </Link>

        <h1 className="text-bold mb-8 text-3xl text-center">
          Connecte-toi à ton compte
        </h1>
        <div className="w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="my-3">
                  <TextInput
                    id="email"
                    name="email"
                    className="bg-white input-placeholder my-10 w-full py-4 px-3 "
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email! && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>

                {!userExists && (
                  <p className="error mt-2 text-sm">
                    Ce compte n&apos;existe pas
                  </p>
                )}

                <div className="my-3">
                  <TextInput
                    id="password"
                    name="password"
                    className="bg-white input-placeholder my-10 w-full text-test py-4 px-3 "
                    placeholder="Mot de passe"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password! && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>

                {error && <p className="error mt-2 text-sm">{error}</p>}
                <button
                  className="flex items-center justify-center py-2 mt-10 submit-button w-full rounded"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
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
            )}
          </Formik>
        </div>

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
