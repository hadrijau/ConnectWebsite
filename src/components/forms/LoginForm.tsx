import * as React from "react";
import { Formik, Field, Form } from "formik";
import Image from "next/image";
import TextInput from "@/components/common/FormTextInput";
import Link from "next/link";

interface LoginFormProps {
  handleSubmit: (values: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  return (
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
            <Image
              src="connectionIcon.svg"
              width={18}
              height={25}
              alt="Connection icone"
            />
            <span className="text-white text-bold text-sm ml-2">Connexion</span>
          </button>

        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
