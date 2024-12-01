"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "@/components/common/CustomDateField";
import "@/styles/Client.css";
import { useRouter } from "next/navigation";
import { lengthOptions, modalitiesOptions } from "@/lib/selectConstants";
import Client from "@/entities/client";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "@/components/common/TextInput";
import LevelSelector from "@/components/common/LevelSelector"; // Import the new component
import CustomAutocomplete from "../common/CustomAutocomplete";
import { competences } from "@/lib/competences";
import Mission, { MissionStatus } from "@/entities/mission";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

interface CreateMissionFormProps {
  user: Client;
}

const CreateMissionForm: React.FC<CreateMissionFormProps> = ({ user }) => {
  const router = useRouter();
  const [hiddenCompany, setHiddenCompany] = useState(false);
  const [hiddenTJM, setHiddenTJM] = useState(false);
  const [hiddenMissionPlace, setHiddenMissionPlace] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    title: yup.string().required("Le titre de la mission est obligatoire"),
    context: yup.string().required("Le contexte est obligatoire"),
    goals: yup.string().required("Les missions et livrables sont obligatoires"),
    date: yup.date().required("La date est obligatoire"),
    price: yup
      .number()
      .required("Le prix est obligatoire")
      .min(0, "Le prix ne peut pas être négatif"),
    length: yup.number().required("La durée de la mission est obligatoire"),
  });

  const initialValues = {
    title: "",
    context: "",
    goals: "",
    date: dayjs(new Date()),
    price: "",
    length: 10,
    modalities: 10,
    hiddenCompany: false,
    hiddenTJM: false,
    hiddenMissionPlace: false,
  };

  const [selectedCompetences, setSelectedCompetences] = useState<
    { label: string; level: number }[]
  >([
    {
      label: "",
      level: 0,
    },
    {
      label: "",
      level: 0,
    },
    {
      label: "",
      level: 0,
    },
    {
      label: "",
      level: 0,
    },
    {
      label: "",
      level: 0,
    },
  ]);

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const numericPart = parseInt(user.lastAOId.substring(2), 10);
      const nextNumericPart = numericPart + 1;
      const newAoId = `AO${nextNumericPart.toString().padStart(5, "0")}`;
      const mission = new Mission({
        // @ts-ignore
        acceptedFreelanceId: "",
        clientId: user._id!,
        title: values.title,
        context: values.context,
        goals: values.goals,
        date: values.date,
        price: values.price,
        length: lengthOptions.find((option) => option.value === values.length)!
          .label,
        modalities: modalitiesOptions.find(
          (option) => option.value === values.modalities
        )!.label,
        competences: selectedCompetences,
        hiddenCompany,
        hiddenMissionPlace,
        hiddenTJM,
        status: MissionStatus.PUBLISHED,
        companyName: "Société Générale",
        aoId: user.lastAOId,
        postalCode: user.postalCode,
        city: user.city,
        propositions: [],
      });
      const result = await mission.save();
  
      const client = new Client({
        ...user,
        missions: [...user.missions, result.mission._id],
        lastAOId: newAoId,
      });
      await client.update();
      router.push("/client/ao");
      router.refresh();
      setLoading(false);
    } catch (err) {
      console.log("Error creating mission", err);
    }
  };

  const removeCompetence = (option: { label: string; level: number }): void => {
    const updatedOptions = selectedCompetences.filter(
      (selectedCompetence) => selectedCompetence.label !== option.label
    );
    setSelectedCompetences(updatedOptions);
  };

  const addCompetence = () => {
    setSelectedCompetences([...selectedCompetences, { label: "", level: 0 }]);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        let error = false;
        if (selectedCompetences.length == 5) {
          selectedCompetences.map((competence) => {
            if (competence.label == "") {
              error = true;
              setFormError("Tu dois sélectionner 5 compétences minimum");
              return;
            }
          });
        }
        if (!error) {
          await handleFormSubmit(values);
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
        <Form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <Link href="/client/ao" className="w-1/12">
            <h5 className="mb-10">&#60;- retour</h5>
          </Link>
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-7/12">
              <h5 className="text-light mb-3">{user.lastAOId}</h5>
              <div className="my-5">
                <TextInput
                  name="title"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  placeholder="Titre de la mission*"
                />
              </div>
              <div className="my-5">
                <TextInput
                  name="context"
                  type="text"
                  multiline
                  rows={13}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.context}
                  error={touched.context && Boolean(errors.context)}
                  helperText={touched.context && errors.context}
                  placeholder="Contexte *"
                />
              </div>
              <div className="my-5">
                <TextInput
                  name="goals"
                  type="text"
                  multiline
                  rows={13}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.goals}
                  error={touched.goals && Boolean(errors.goals)}
                  helperText={touched.goals && errors.goals}
                  placeholder="Missions et livrables *"
                />
              </div>

              <div className="flex justify-between mt-5">
                <div
                  className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                    !hiddenCompany ? `hide-button` : "hide-button-focus"
                  }`}
                  onClick={() => setHiddenCompany(!hiddenCompany)}
                >
                  <h5 className="text-normal text-center">
                    Je cache le nom de la société
                  </h5>
                </div>
                <div
                  className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                    !hiddenTJM ? `hide-button` : "hide-button-focus"
                  }`}
                  onClick={() => setHiddenTJM(!hiddenTJM)}
                >
                  <h5 className="text-normal text-center">
                    Je cache le TJM demandé
                  </h5>
                </div>
                <div
                  className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                    !hiddenMissionPlace ? `hide-button` : "hide-button-focus"
                  }`}
                  onClick={() => setHiddenMissionPlace(!hiddenMissionPlace)}
                >
                  <h5 className="text-normal text-center">
                    Je cache le lieu de la mission
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-4/12">
              <div className="flex my-2">
                <Image
                  src="/calendrier.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <div className="w-6/12">
                  <Field
                    name="date"
                    component={CustomDateField}
                    value={values.date}
                    onChange={(value: Dayjs | null) =>
                      setFieldValue("date", value)
                    }
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    placeholder="Sélectionner une date*"
                  />
                </div>
              </div>
              <div className="flex my-2">
                <Image
                  src="/tarifHT.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <div className="w-4/12">
                  <TextInput
                    name="price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    placeholder="Tarif*"
                  />
                </div>
                <p className="mt-4 ml-4">€ HT/jour</p>
              </div>
              <div className="flex my-2">
                <Image
                  src="/dureeMission.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <CustomSelect
                  name="length"
                  value={values.length}
                  onChange={(e) => setFieldValue("length", e.target.value)}
                  onBlur={handleBlur}
                  options={lengthOptions}
                  placeholder="Durée de la mission*"
                />
              </div>
              <div className="flex my-2">
                <Image
                  src="/modaliteTravail.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <CustomSelect
                  name="modalities"
                  value={values.modalities}
                  onChange={(e) => setFieldValue("modalities", e.target.value)}
                  onBlur={handleBlur}
                  options={modalitiesOptions}
                  placeholder="Modalitiés de la mission*"
                />
                <ErrorMessage
                  name="sector"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex my-2">
                <Image
                  src="/ImageMap.svg"
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <p className="mt-1">
                  {user.city}, {user.postalCode}
                </p>
              </div>
              <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
                <p className=" text-xl text-normal">
                  Compétences requises <span className="color-red">*</span>
                </p>

                <div className="flex justify-between mt-5 mb-5">
                  <p>Compétences</p>
                  <p>Niveau</p>
                </div>

                {selectedCompetences.map((competence, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between my-1 lg:mx-0"
                  >
                    {/* {index >= 5 && (
                      <button
                        className="mr-2 text-red-500"
                        onClick={() => removeCompetence(competence)}
                      >
                        x
                      </button>
                    )} */}
                    <div className="w-6/12">
                      <CustomAutocomplete        
                        value={competence.label}
                        setValue={(newValue) => {
                          const updatedCompetences = [...selectedCompetences];
                          updatedCompetences[index].label = newValue || "";
                          setSelectedCompetences(updatedCompetences);
                        }}
                        options={competences}
                      />
                    </div>

                    <div className="w-5/12 flex justify-center lg:w-7/12">
                      <LevelSelector
                        value={competence.level}
                        onChange={(level) => {
                          const updatedCompetences = [...selectedCompetences];
                          updatedCompetences[index].level = level;
                          setSelectedCompetences(updatedCompetences);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div
                  className="flex justify-end mt-5 cursor-pointer"
                  onClick={addCompetence}
                >
                  <p className="text-normal">+ Ajoute une compétence</p>
                </div>
              </div>
              {formError && <p className="error text-xs">{formError}</p>}
              {loading ? (
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              ) : (
                <button
                  className="my-12 py-5 px-10 submit-button rounded-2xl bg-client"
                  type="submit"
                >
                  <span className="text-xl text-semibold ml-2 mr-2">
                    Publier
                  </span>
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateMissionForm;
