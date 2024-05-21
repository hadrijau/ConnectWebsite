import * as React from "react";
import { Formik, Form } from "formik";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";
import Link from "next/link";
import * as yup from "yup";

interface SignupFormProps {
  userExists: boolean;
  handleSubmit: (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accept: boolean;
  }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  handleSubmit,
  userExists,
}) => {
  const validationSchema = yup.object({
    firstname: yup
      .string()
      .required("Le prénom est obligatoire"),
    lastname: yup
      .string()
      .required("Le nom est obligatoire"),
    email: yup
      .string()
      .email("Adresse email incorrecte")
      .required("L'email est obligatoire"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au minimum 8 caractères")
      .required("Le mot de passe est obligatoire"),
    accept: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les conditions d'utilisations")
      .required("Tu dois accepter les conditions d'utilisations"),
  });

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        accept: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (!userExists) {
          handleSubmit(values);
        }
      }}
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
          <div className="w-full">
            <label htmlFor="lastname mb-2">Nom</label>
            <div className="mb-5">
              <TextInput
                id="lastname"
                name="lastname"
                type="text"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastname! && Boolean(errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </div>
            <label htmlFor="firstname mt-10">Prénom</label>
            <div className="mb-5">
              <TextInput
                id="firstname"
                name="firstname"
                type="text"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstname! && Boolean(errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
            </div>

            <label htmlFor="email">Email</label>
            <div className="mb-5">
              <TextInput
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email! && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              {userExists && (
                <p className="error mt-2 text-sm">
                  Tu as déjà un compte
                  <span className="font-bold ml-1">
                    <Link href="/login">CONNECT</Link>
                  </span>
                </p>
              )}
            </div>
            <label htmlFor="password">Mot de passe</label>
            <div className="mb-5">
              <TextInput
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password! && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="checkbox"
                  id="accept"
                  name="accept"
                  className="mr-3 w-1/12"
                  checked={values.accept}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="accept">J&apos;ai lu et j&apos;accepte</label>
          
              </div>
              {touched.accept && errors.accept && (
                  <div className="error text-sm">{errors.accept}</div>
                )}
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <p className="mb-2">Déjà inscrit ?</p>
                <Link href="/login" className="text-bold underline">
                  Connecte-toi
                </Link>
              </div>
              <button
                className="flex items-center justify-center py-3 px-10 submit-button rounded-full"
                type="submit"
              >
                <span className="text-white text-sm ml-2 mr-2">Suivant</span>
                <Image
                  src="connectionIcon.svg"
                  width={18}
                  height={25}
                  alt="Connection icone"
                />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
