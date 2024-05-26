"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "@/components/common/CustomDateField";
import "@/styles/Client.css";
import { createMission } from "@/http/mission";
import FormButton from "@/components/common/FormButton";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import {
  lengthOptions,
  levelOptions,
  modalitiesOptions,
} from "@/lib/selectConstants";
import { Client } from "@/entities/client";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "@/components/common/TextInput";
import LevelSelector from "@/components/common/LevelSelector"; // Import the new component

interface CreateMissionFormProps {
  user: Client;
}

const CreateMissionForm: React.FC<CreateMissionFormProps> = ({ user }) => {
  const router = useRouter();
  const [hiddenCompany, setHiddenCompany] = useState(false);
  const [hiddenTJM, setHiddenTJM] = useState(false);
  const [hiddenMissionPlace, setHiddenMissionPlace] = useState(false);

  const validationSchema = yup.object({
    title: yup.string().required("Le titre de la mission est obligatoire"),
    context: yup.string().required("Le contexte est obligatoire"),
    goals: yup.string().required("Les missions et livrables sont obligatoires"),
    date: yup.date().required("La date est obligatoire"),
    price: yup
      .string()
      .required("Le prix est obligatoire")
      .min(0, "Le prix ne peut pas être négatif"),
    length: yup.number().required("La durée de la mission est obligatoire"),
  });

  const initialValues = {
    title: "",
    context: "",
    goals: "",
    date: dayjs("2022-04-17"),
    price: "",
    length: 10,
    modalities: 10,
    hiddenCompany: false,
    hiddenTJM: false,
    hiddenMissionPlace: false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await createMission(
        values.title,
        values.context,
        values.goals,
        values.date,
        values.price,
        lengthOptions.find((option) => option.value === values.length)!.label,
        modalitiesOptions.find((option) => option.value === values.modalities)!
          .label,
        selectedCompetences,
        values.hiddenCompany,
        values.hiddenMissionPlace,
        values.hiddenTJM
      );
      router.push("/client/ao");
      router.refresh();
    } catch (err) {
      console.log("Error creating mission", err);
    }
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
    {
      label: "",
      level: 0,
    },
  ]);

  const handleSelectOption = (option: {
    label: string;
    level: number;
  }): void => {
    setSelectedCompetences([
      ...selectedCompetences,
      { label: option.label, level: 0 },
    ]);
  };

  const removeCompetence = (option: { label: string; level: number }): void => {
    const updatedOptions = selectedCompetences.filter(
      (selectedCompetence) => selectedCompetence.label !== option.label
    );
    setSelectedCompetences(updatedOptions);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
        <Form className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-7/12">
              <h5 className="text-light mb-3">AO 00002</h5>
              <div className="my-5">
                <TextInput
                  name="title"
                  type="text"
                  onChange={handleChange}
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
                  rows={10}
                  onChange={handleChange}
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
                  rows={10}
                  onChange={handleChange}
                  value={values.goals}
                  error={touched.goals && Boolean(errors.goals)}
                  helperText={touched.goals && errors.goals}
                  placeholder="Missions et livrables *"
                />
              </div>

              <div className="flex justify-between mt-5">
                <div
                  className="hide-button rounded-2xl w-3/12 p-2"
                  onClick={() => setHiddenCompany(!hiddenCompany)}
                >
                  <h5 className="text-normal text-center">
                    Je cache le nom de la société
                  </h5>
                </div>
                <div
                  className="hide-button rounded-2xl w-3/12 p-2"
                  onClick={() => setHiddenTJM(!hiddenTJM)}
                >
                  <h5 className="text-normal text-center">
                    Je cache le TJM demandé
                  </h5>
                </div>
                <div
                  className="hide-button rounded-2xl w-3/12 p-2"
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
                <div className="w-full">
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
                <div className="w-3/12">
                  <TextInput
                    name="price"
                    type="text"
                    onChange={handleChange}
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
                <p className="mb-5">
                  Compétences requises <span className="color-red">*</span>
                </p>
                <SearchBar
                  createMission={true}
                  onSelectOption={handleSelectOption}
                  //@ts-ignore
                  setSelectedCompetences={setSelectedCompetences}
                  //@ts-ignore
                  selectedCompetences={selectedCompetences}
                  placeholder="Ecriture, UX Design, Communication, Pack Office ..."
                />
                {selectedCompetences && (
                  <div className="flex justify-between mt-5 mb-5">
                    <p>Compétences</p>
                    <p>Niveau</p>
                  </div>
                )}
                {selectedCompetences.map((competence, index) => (
                  <div
                    key={competence.label}
                    className="flex flex-row justify-between lg:mx-0"
                  >
                    <span>
                      <span
                        className="mr-3 text-xl cursor-pointer"
                        onClick={() => removeCompetence(competence)}
                      >
                        x
                      </span>
                      {competence.label}
                    </span>
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
              </div>
            </div>
          </div>
          <div className="w-4/12 my-20">
            <FormButton
              title="Soumettre la mission"
              background="#D892C0"
              handleButtonClick={handleSubmit}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateMissionForm;
