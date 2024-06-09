"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import "@/styles/Freelance.css";
import { useRouter } from "next/navigation";
import Freelance, { Enterprise } from "@/entities/freelance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomSelect from "@/components/common/CustomSelect";
import { CircularProgress } from "@mui/material";

interface EntrepriseFreelanceFormProps {
  user: Freelance;
}

const EntrepriseFreelanceForm: React.FC<EntrepriseFreelanceFormProps> = ({
  user,
}) => {
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  const initialValues = {
    name: user.enterprise.name || "",
    address: user.enterprise.address || "",
    city: user.enterprise.city || "",
    postalCode: user.enterprise.postalCode || "",
    siret: user.enterprise.siret || "",
    hasTVA: String(user.enterprise.hasTVA) || "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [typeOfContract, setTypeOfContract] = useState(10);

  const tvaOptions = [
    {
      value: 10,
      label: "True",
    },
    {
      value: 20,
      label: "False",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const enterprise: Enterprise = {
            name: values.name,
            address: values.address,
            city: values.city,
            postalCode: values.postalCode,
            siret: values.siret,
            hasTVA: values.hasTVA === "True",
          };
          const updatedFreelance = new Freelance({
            email: user.email,
            title: user.title,
            phone: user.phone,
            lastMission: user.lastMission,
            lengthMissionWanted: user.lengthMissionWanted,
            descriptionMissionWanted: user.descriptionMissionWanted,
            profilePicture: user.profilePicture,
            enterprise: enterprise,
            competences: user.competences,
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            experiences: user.experiences,
            cv: user.cv,
          });
          await updatedFreelance.update();
          router.push("/freelance");
          setIsLoading(false);
        } catch (err) {
          console.log("err", err);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form
          className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12"
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <TextInput
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name && errors.name}
              placeholder="Nom de ta société"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="mt-10">
            <TextInput
              name="phone"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address! && Boolean(errors.address)}
              helperText={touched.address && errors.address}
              placeholder="Adresse"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="flex justify-between mt-10">
            <div className="w-5/12">
              <TextInput
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                error={touched.city! && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                placeholder="Ville"
                className="my-4 w-10/12"
              />
            </div>
            <div className="w-5/12 ml-10">
              <TextInput
                name="postalCode"
                type="text"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postalCode! && Boolean(errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
                placeholder="Code postal"
                className="my-4 w-10/12"
              />
            </div>
          </div>

          <div className="mt-10">
            <TextInput
              name="siret"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.siret}
              placeholder="Numéro de siret"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="mt-10">
            <CustomSelect
              name="hasTVA"
              value={values.hasTVA}
              onChange={(e) => setFieldValue("hasTVA", e.target.value)}
              onBlur={handleBlur}
              options={tvaOptions}
              placeholder="Es-tu assujetti à la TVA ?"
            />
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex flex-col">
              <p onClick={() => router.push("/freelance")} className="cursor-pointer">retour &#60;- à l&apos;accueil</p>
              <p className="mt-3 cursor-pointer" onClick={() => router.push("/freelance")} >Je passe cette étape</p>
            </div>

            <div className="flex justify-end ">
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <button
                  type="submit"
                  title="Sauvegarder"
                  className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
                  style={{ background: "rgba(185, 211, 134, 0.5)" }}
                >
                  Lire le contrat
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EntrepriseFreelanceForm;
