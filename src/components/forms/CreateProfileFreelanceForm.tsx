"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Freelance from "@/entities/freelance";
import CircularProgress from "@mui/material/CircularProgress";
import FreelanceProfilPictureUpload from "../upload/FreelanceProfilPictureUpload";

interface CreateProfileFreelanceFormProps {
  user: Freelance;
}

const CreateProfileFreelanceForm: React.FC<CreateProfileFreelanceFormProps> = ({
  user,
}) => {
  const router = useRouter();
  if (!user) {
    router.push("/")
  }
  const initialValues = {
    title: user.title || "",
    phone: user.phone || "",
    lastMission: user.lastMission,
    lengthMissionWanted: user.lengthMissionWanted || "",
    descriptionMissionWanted: user.descriptionMissionWanted || "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    title: yup.string().required("Champ obligatoire"),
    phone: yup
      .string()
      .required("Champ obligatoire")
      .matches(phoneRegExp, "Numéro de téléphone incorrect"),
    lastMission: yup.string().required("Champ obligatoire"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const updatedFreelance = new Freelance({
            email: user.email,
            title: values.title,
            phone: values.phone,
            lastMission: values.lastMission,
            lengthMissionWanted: values.lengthMissionWanted,
            descriptionMissionWanted: values.descriptionMissionWanted,
            profilePicture: user.profilePicture,
            enterprise: user.enterprise,
            competences: user.competences,
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            experiences: user.experiences,
            cv: user.cv
          })
          await updatedFreelance.update()
          router.push("/freelance/profil/competences");
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
      }) => (
        <Form
          className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12"
          onSubmit={handleSubmit}
        >
          <div className="flex my-5">
            <FreelanceProfilPictureUpload freelance={user}/>

            <div className="flex-col mt-10 ml-10">
              <h5 className="font-normal text-xl">
                {user.firstname} {user.lastname}
              </h5>
              <p className="font-light">{user.email}</p>
            </div>
          </div>
          <div className="my-3">
            <TextInput
              name="title"
              type="text"
              value={values.title}
              error={touched.title! && Boolean(errors.title)}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              placeholder="Vous êtes* (exemple : chargée de communication interne)"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="my-3">
            <TextInput
              name="phone"
              type="text"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone! && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              placeholder="Numéro de téléphone*"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="my-3">
            <TextInput
              name="lastMission"
              type="text"
              value={values.lastMission}
              onChange={handleChange}
              error={touched.lastMission! && Boolean(errors.lastMission)}
              helperText={touched.lastMission && errors.lastMission}
              placeholder="Dernière mission*"
              className="rounded-full my-4 w-10/12"
            />
          </div>
          <div className="my-3">
            <TextInput
              name="lengthMissionWanted"
              type="text"
              value={values.lengthMissionWanted}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.lengthMissionWanted! &&
                Boolean(errors.lengthMissionWanted)
              }
              helperText={
                touched.lengthMissionWanted && errors.lengthMissionWanted
              }
              placeholder="Durée de mission souhaitée"
              className="rounded-full my-4 w-10/12"
            />
          </div>

          <div className="my-3">
            <TextInput
              name="descriptionMissionWanted"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.descriptionMissionWanted}
              placeholder="Description..."
              multiline
              rows={6}
              className="h-40 rounded-3xl w-10/12"
            />
          </div>
          <div className="flex justify-end mt-10">
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <button
                type="submit"
                title="Sauvegarder"
                className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
                style={{ background: "rgba(185, 211, 134, 0.5)" }}
              >
                OK
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProfileFreelanceForm;
