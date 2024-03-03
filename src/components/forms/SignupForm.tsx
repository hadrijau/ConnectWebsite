import * as React from "react";
import { Formik, Field, Form } from "formik";
import Image from "next/image";
import TextInput from "@/components/common/FormTextInput";
import Link from "next/link";

interface SignupFormProps {
  handleSubmit: (values: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accept: boolean;
  }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSubmit }) => {
  return (
    <div className="w-full">
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          accept: false,
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <label htmlFor="lastname">Nom</label>
          <Field
            id="lastname"
            name="lastname"
            className="input-grey mb-10 w-full py-4 px-3 mt-1"
            type="text"
            label="Nom"
            component={TextInput}
          />
          <label htmlFor="lastname">Prénom</label>

          <Field
            id="firstname"
            name="firstname"
            className="input-grey mb-10 w-full py-4 px-3 mt-1"
            type="text"
            label="Prénom"
            component={TextInput}
          />

          <label htmlFor="lastname">Email</label>

          <Field
            id="email"
            name="email"
            className=" input-grey mb-10 w-full py-4 px-3 mt-1"
            type="email"
            label="Email"
            component={TextInput}
          />
          <label htmlFor="lastname">Mot de passe</label>

          <Field
            id="password"
            name="password"
            className="input-grey mb-10 w-full py-4 px-3"
            type="password"
            component={TextInput}
          />

          <div className="flex mb-10">
            <input type="checkbox" className="mr-3 w-1/12" />
            <p>J&apos;ai lu et j&apos;accepte</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="mb-2">Déja inscrit ?</p>
              <Link href="/login" className="text-bold underline">
                Connectez-vous
              </Link>
            </div>
            <button
              className="flex items-center justify-center py-3 px-10 submit-button rounded-full"
              type="submit"
            >
              <span className="text-white text-sm ml-2">Suivant</span>
              <Image
                src="connectionIcon.svg"
                width={18}
                height={25}
                alt="Connection icone"
              />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
