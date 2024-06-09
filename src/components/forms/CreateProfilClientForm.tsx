"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "@/components/common/TextInput";
import CustomSelect from "@/components/common/CustomSelect";
import "@/styles/Client.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Client from "@/entities/client";
import * as yup from "yup";
import CustomAutocomplete from "../common/CustomAutocomplete";
import { sectors } from "@/lib/secteurs";
import { CircularProgress } from "@mui/material";

interface CreateProfilClientFormProps {
  client: Client;
}

const CreateProfilClientForm: React.FC<CreateProfilClientFormProps> = ({
  client,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    domainName: client.domainName || "",
    phoneNumber: client.phoneNumber || "",
    address: client.address || "",
    postalCode: client.postalCode || "",
    city: client.city || "",
    description: client.description || "",
    sector: client.sector || "",
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    domainName: string;
    phoneNumber: string;
    postalCode: string;
    address: string;
    city: string;
    description: string;
    sector: string;
  }) => {
    try {
      setLoading(true);
      const updatedClient = new Client({
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
        domainName: values.domainName,
        sector: values.sector,
        description: values.description,
        _id: client._id,
        lastAOId: client.lastAOId,
      });
      await updatedClient.update();
      router.push("/client");
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false); // Ensure loading state is reset in case of error
    }
  };

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
      }) => {
        return (
          <Form
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
                <p className="font-light">{session?.user?.email}</p>
              </div>
            </div>
            <div className="my-3">
              <TextInput
                name="domainName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={touched.phoneNumber! && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                className="rounded-2xl my-4 w-8/12 lg:w-11/12"
                placeholder="Numéro de téléphone*"
              />
            </div>
            <div className="my-3">
              <CustomAutocomplete
                placeholder="Secteur*"
                options={sectors}
                value={values.sector}
                setValue={(newValue) => setFieldValue("sector", newValue)}
              />
              <ErrorMessage
                name="sector"
                component="div"
                className="error text-xs ml-4 mt-1"
              />
            </div>
            <div className="my-3">
              <TextInput
                name="address"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Description..."
                className="w-8/12 rounded-3xl select-profil-container my-5 h-48 lg:w-11/12"
              />
            </div>
            <div className="flex justify-end">
              {loading ? (
                <CircularProgress />
              ) : (
                <button
                  type="submit"
                  title="Sauvegarder"
                  className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
                  style={{ background: "rgba(233, 194, 220, 1)" }}
                >
                  OK
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateProfilClientForm;
