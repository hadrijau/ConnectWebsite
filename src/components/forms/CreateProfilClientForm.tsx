"use client";
import React from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import TextInput from "@/components/common/TextInput";
import CustomSelect from "@/components/common/CustomSelect";
import "@/styles/Client.css";
import { useSession } from "next-auth/react";
import { updateClient } from "@/http/client";
import { useRouter } from "next/navigation";
import { Client } from "@/entities/client";
import * as yup from "yup";

interface CreateProfilClientFormProps {
  client: Client;
}

const CreateProfilClientForm: React.FC<CreateProfilClientFormProps> = ({
  client,
}) => {
  const session = useSession();
  const router = useRouter();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    domainName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
    description: "",
    sector: "",
  };

  const validationSchema = yup.object({
    domainName: yup.string().required("Le nom de domaine est obligatoire"),
    phoneNumber: yup
      .string()
      .required("Le numéro de téléphone est obligatoire")
      .matches(phoneRegExp, "Numéro de téléphone incorrect"),
    address: yup.string().required("L'adresse est obligatoire"),
    postalCode: yup.string().required("Le code postal est obligatoire"),
    city: yup.string().required("La ville est obligatoire"),
    sector: yup.string().required("Le secteur est obligatoire"),
  });

  const handleSubmit = async (values: {
    domainName: string;
    phoneNumber: string;
    postalCode: string;
    address: string;
    city: string;
    description: string;
  }) => {
    const email = session.data?.user?.email!;
    console.log("values", values);
    try {
      await updateClient(
        email,
        values.domainName,
        values.phoneNumber,
        values.address,
        values.postalCode,
        values.city,
        values.description
      );
      router.push("/client/create-ao");
    } catch (err) {
      console.log("err", err);
    }
  };

  const options = [
    { value: 10, label: "0-3 mois" },
    { value: 20, label: "3-6 mois" },
    { value: 30, label: "6 mois et 1 an" },
    { value: 40, label: "entre 1 et 2 ans" },
    { value: 50, label: "+2 ans" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        handleSubmit,
      }) => (
        <form
          className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12"
          onSubmit={handleSubmit}
        >
          <div className="flex my-5">
            <Image
              src="/uploadProfilClient.svg"
              width={120}
              height={120}
              alt="Photo de profil"
            />
            <div className="flex-col mt-10 ml-10">
              <h5 className="font-normal text-xl">Client</h5>
              <p className="font-light">{session.data?.user?.email}</p>
            </div>
          </div>
          <div className="my-3">
            <TextInput
              name="domainName"
              type="text"
              onChange={handleChange}
              value={values.domainName}
              error={touched.domainName! && Boolean(errors.domainName)}
              helperText={touched.domainName && errors.domainName}
              className="rounded-2xl w-8/12 lg:w-11/12"
              placeholder="Nom de domaine*"
            />
          </div>
          <div className="my-3">
            <TextInput
              name="phoneNumber"
              type="text"
              onChange={handleChange}
              value={values.phoneNumber}
              error={touched.phoneNumber! && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              className="rounded-2xl my-4 w-8/12 lg:w-11/12"
              placeholder="Numéro de téléphone*"
            />
          </div>
          <div className="my-3">
            <CustomSelect
              name="sector"
              value={values.sector}
              onChange={(e) => setFieldValue("sector", e.target.value)}
              onBlur={handleBlur}
              options={options}
              placeholder="Secteur*"
            />
            <ErrorMessage
              name="sector"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="my-3">
            <TextInput
              name="address"
              type="text"
              onChange={handleChange}
              value={values.address}
              className="rounded-2xl my-4 w-8/12 lg:w-11/12"
              placeholder="Adresse*"
              error={touched.address! && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
          </div>
          <div className="my-3">
            <div className="flex w-full">
              <div className="rounded-2xl w-6/12">
                <TextInput
                  name="city"
                  type="text"
                  onChange={handleChange}
                  value={values.city}
                  placeholder="Ville*"
                  error={touched.city! && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </div>
              <div className="rounded-2xl w-6/12 ml-10">
                <TextInput
                         id="postalCode"
                  name="postalCode"
                  type="text"
                  onChange={handleChange}
                  value={values.postalCode}
                  placeholder="Code postal*"
                  error={touched.postalCode! && Boolean(errors.postalCode)}
                  helperText={touched.postalCode && errors.postalCode}
                />
              </div>
            </div>
          </div>
          <div className="my-3">
            <TextInput
              name="description"
              type="text"
              value={values.description}
              multiline
              rows={6}
              placeholder="Description..."
              className="w-8/12 rounded-3xl select-profil-container my-5 h-48 lg:w-11/12"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              title="Sauvegarder"
              className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
              style={{ background: "rgba(233, 194, 220, 1)" }}
            >
              OK
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateProfilClientForm;
