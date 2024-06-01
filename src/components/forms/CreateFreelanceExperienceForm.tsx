"use client";
import React, { use, useState } from "react";
import TextInput from "@/components/common/TextInput";
import FormButton from "@/components/common/FormButton";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import "@/styles/Freelance.css";
import CustomUpload from "../upload/CustomUpload";
import { typeOfContractOptions } from "@/lib/selectConstants";
import { useRouter } from "next/navigation";
import Freelance, { Experience } from "@/entities/freelance";
import { Field, Form, Formik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import CustomDateField from "../common/CustomDateField";

interface CreateFreelanceExperienceFormProps {
  user: Freelance;
}

const CreateFreelanceExperienceForm: React.FC<
  CreateFreelanceExperienceFormProps
> = ({ user }) => {
  const router = useRouter();
  const userExperiences = user.experiences;

  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingAddExperience, setIsLoadingAddExperience] = useState(false);

  const initialValues = {
    jobTitle: "",
    company: "",
    typeOfContract: 20,
    beginningDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    formattedBeginningDate: "",
    formattedEndDate: "",
  };

  const validationSchema = yup.object({
    jobTitle: yup.string().required("Champ obligatoire"),
    company: yup.string().required("Champ obligatoire"),
    typeOfContract: yup.string().required("Champ obligatoire"),
    beginningDate: yup.string().required("Champ obligatoire"),
    endDate: yup.string().required("Champ obligatoire"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setIsLoadingAddExperience(true);
        console.log("values", values);
        const experience: Experience = {
          jobTitle: values.jobTitle,
          company: values.company,
          typeOfContract: typeOfContractOptions.find(
            (option) => option.value === values.typeOfContract
          )!.label,
          beginningDate: values.beginningDate,
          endDate: values.endDate,
          formattedBeginningDate: dayjs(values.beginningDate).format(
            "DD-MM-YYYY"
          ),
          formattedEndDate: dayjs(values.endDate).format("DD-MM-YYYY"),
        };
        console.log("exp", experience)
        let updatedExperiences = user.experiences;
        updatedExperiences.push(experience);
        console.log('updated', updatedExperiences)
        try {
          const freelance = new Freelance({
            _id: user._id,
            title: user.title,
            phone: user.phone,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            lastMission: user.lastMission,
            lengthMissionWanted: user.lengthMissionWanted,
            descriptionMissionWanted: user.descriptionMissionWanted,
            competences: user.competences,
            enterprise: user.enterprise,
            profilePicture: user.profilePicture,
            experiences: updatedExperiences,
          });
          await freelance.update();
          router.refresh();
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
        setFieldValue,
        touched,
        errors,
        handleSubmit,
      }) => (
        <Form
          className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12"
          onSubmit={handleSubmit}
        >
          {userExperiences && userExperiences.length != 0 && (
            <div>
              {user.experiences.map((experience, index) => {
                return (
                  <div className="flex" key={index}>
                    <p>{experience.company}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <div className="flex justify-between">
              <div className="flex flex-col w-5/12">
                <TextInput
                  name="jobTitle"
                  type="text"
                  value={values.jobTitle}
                  error={touched.jobTitle! && Boolean(errors.jobTitle)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.jobTitle && errors.jobTitle}
                  placeholder="Intitulé du poste*"
                  className="rounded-full my-4 w-10/12"
                />
              </div>
              <div className="flex flex-col w-5/12">
                <TextInput
                  name="company"
                  type="text"
                  value={values.company}
                  error={touched.company! && Boolean(errors.company)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.company && errors.company}
                  placeholder="Entreprise*"
                  className="rounded-full my-4 w-10/12"
                />
              </div>
            </div>

            <div className="flex justify-between mt-10">
              <div className="w-full rounded-full py-2">
                <CustomSelect
                  name="typeOfContract"
                  value={values.typeOfContract}
                  onChange={(e) =>
                    setFieldValue("typeOfContract", e.target.value)
                  }
                  onBlur={handleBlur}
                  options={typeOfContractOptions}
                  placeholder="Choisis ton type de contrat*"
                />
              </div>
            </div>

            <div className="flex justify-between mt-10">
              <div className="flex flex-col w-5/12">
                <Field
                  name="beginningDate"
                  component={CustomDateField}
                  value={values.beginningDate}
                  onChange={(value: Dayjs | null) =>
                    setFieldValue("beginningDate", value)
                  }
                  onBlur={handleBlur}
                  error={touched.beginningDate && Boolean(errors.beginningDate)}
                  helperText={touched.beginningDate && errors.beginningDate}
                  placeholder="Sélectionner la date de début*"
                />
              </div>

              <div className="flex flex-col  w-5/12">
                <Field
                  name="endDate"
                  component={CustomDateField}
                  value={values.endDate}
                  onChange={(value: Dayjs | null) =>
                    setFieldValue("endDate", value)
                  }
                  onBlur={handleBlur}
                  error={touched.endDate && Boolean(errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                  placeholder="Sélectionner la date de fin*"
                />
              </div>
            </div>
          </div>

          {isLoadingAddExperience ? (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              className="flex items-center justify-center mt-20 w-10/12 cursor-pointer"
              type="submit"
            >
              <span className="font-green text-4xl">+</span>
              <p>Ajoute une expérience</p>
            </button>
          )}

          <div className="flex justify-center items-center w-10/12 mt-6">
            <div>
              {!downloadUrl ? (
                <CustomUpload
                  setDownloadUrl={setDownloadUrl}
                  accept="application/pdf"
                >
                  <button
                    type="submit"
                    onClick={() => router.push("/freelance/profil/entreprise")}
                    title="Sauvegarder"
                    className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-normal`}
                    style={{ background: "rgba(185, 211, 134, 0.5)" }}
                  >
                    Télécharge ton CV ici
                  </button>
                </CustomUpload>
              ) : (
                <div className="flex items-center justify-center mt-5 w-10/12 cursor-pointer mb-10">
                  <p>CV uploadé !</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-10">
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <button
                onClick={() => router.push("/freelance/profil/entreprise")}
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

export default CreateFreelanceExperienceForm;
