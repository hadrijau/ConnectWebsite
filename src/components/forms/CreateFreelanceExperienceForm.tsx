"use client";
import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import TextInput from "@/components/common/TextInput";
import CustomSelect from "@/components/common/CustomSelect";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Freelance, { Experience } from "@/entities/freelance";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import CustomDateField from "../common/CustomDateField";
import CVUpload from "../upload/CVUpload";
import { typeOfContractOptions } from "@/lib/selectConstants";

interface CreateFreelanceExperienceFormProps {
  user: Freelance;
}

const CreateFreelanceExperienceForm: React.FC<
  CreateFreelanceExperienceFormProps
> = ({ user }) => {
  const router = useRouter();
  const userExperiences = user.experiences;

  const [isLoadingAddExperience, setIsLoadingAddExperience] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

  const handleDeleteExperience = async (index: number) => {
    const updatedExperiences = user.experiences.filter((_, i) => i !== index);
    const updatedFreelance = new Freelance({
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
      cv: user.cv,
    });
    await updatedFreelance.update();
    router.refresh();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
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

        let updatedExperiences = user.experiences;
        if (editIndex !== null) {
          updatedExperiences[editIndex] = experience;
        } else {
          updatedExperiences.push(experience);
        }

        try {
          const updatedFreelance = new Freelance({
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
            cv: user.cv,
          });
          await updatedFreelance.update();
          router.refresh();
          resetForm();
          setIsLoadingAddExperience(false);
          setEditIndex(null);
        } catch (err) {
          console.log("err", err);
        }
      }}
    >
      {(formik: FormikProps<typeof initialValues>) => {
        const handleExperienceClick = (index: number) => {
          const experience = user.experiences[index];
          setEditIndex(index);
          formik.setFieldValue("jobTitle", experience.jobTitle);
          formik.setFieldValue("company", experience.company);
          formik.setFieldValue(
            "typeOfContract",
            typeOfContractOptions.find(
              (option) => option.label === experience.typeOfContract
            )?.value || 20
          );
          formik.setFieldValue(
            "beginningDate",
            dayjs(experience.beginningDate)
          );
          formik.setFieldValue("endDate", dayjs(experience.endDate));
          formik.setFieldValue(
            "formattedBeginningDate",
            experience.formattedBeginningDate
          );
          formik.setFieldValue("formattedEndDate", experience.formattedEndDate);
        };

        return (
          <Form
            className="flex-col mt-5 w-8/12 2xl:w-9/12 2lg:w-10/12"
            onSubmit={formik.handleSubmit}
          >
            <div className="overflow-auto max-h-96 ">
              {userExperiences && userExperiences.length !== 0 && (
                <div>
                  {user.experiences.map((experience, index) => {
                    return (
                      <div
                        className="flex bg-lightgrey py-2 px-3 my-2 rounded justify-between cursor-pointer"
                        key={index}
                        onClick={() => handleExperienceClick(index)}
                      >
                        <p className="text-normal">
                          {experience.jobTitle} de{" "}
                          {experience.formattedBeginningDate} à{" "}
                          {experience.formattedEndDate}
                        </p>
                        <p
                          className="font-semibold cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExperience(index);
                          }}
                        >
                          x
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between mt-10">
                <div className="flex flex-col w-5/12">
                  <TextInput
                    name="jobTitle"
                    type="text"
                    value={formik.values.jobTitle}
                    error={formik.touched.jobTitle! && Boolean(formik.errors.jobTitle)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                    placeholder="Intitulé du poste*"
                    className="my-4 w-10/12"
                  />
                </div>
                <div className="flex flex-col w-5/12">
                  <TextInput
                    name="company"
                    type="text"
                    value={formik.values.company}
                    error={formik.touched.company! && Boolean(formik.errors.company)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.company && formik.errors.company}
                    placeholder="Entreprise*"
                    className="my-4 w-10/12"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <div className="w-full rounded-full py-2">
                  <CustomSelect
                    name="typeOfContract"
                    value={formik.values.typeOfContract}
                    onChange={(e) =>
                      formik.setFieldValue("typeOfContract", e.target.value)
                    }
                    onBlur={formik.handleBlur}
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
                    value={formik.values.beginningDate}
                    onChange={(value: Dayjs | null) =>
                      formik.setFieldValue("beginningDate", value)
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.beginningDate && Boolean(formik.errors.beginningDate)}
                    helperText={formik.touched.beginningDate && formik.errors.beginningDate}
                    placeholder="Sélectionner la date de début*"
                  />
                </div>

                <div className="flex flex-col w-5/12">
                  <Field
                    name="endDate"
                    component={CustomDateField}
                    value={formik.values.endDate}
                    onChange={(value: Dayjs | null) =>
                      formik.setFieldValue("endDate", value)
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
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
                className="flex items-center justify-center w-full cursor-pointer mt-10"
                type="submit"
              >
                <span className="font-green text-4xl">+</span>
                <p>
                  {editIndex !== null
                    ? "Modifier cette expérience"
                    : "Ajoute cette expérience"}
                </p>
              </button>
            )}

            <div className="flex justify-center items-center w-full mt-6">
              <CVUpload freelance={user} />
            </div>

            <div className="flex justify-between mt-10">
              {user.experiences.length !== 0 && (
                <p
                  onClick={() => router.push("/freelance")}
                  className="cursor-pointer mt-5"
                >
                  &#60;- retour à l&apos;accueil
                </p>
              )}

              <div className="flex justify-end">
                <div
                  onClick={() => router.push("/freelance/profil/entreprise")}
                  title="Sauvegarder"
                  className={` text-center rounded-2xl py-3 cursor-pointer px-8 font-semibold`}
                  style={{ background: "rgba(185, 211, 134, 0.5)" }}
                >
                  OK
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateFreelanceExperienceForm;
