"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDateField from "@/components/common/CustomDateField";
import TextInput from "@/components/common/TextInput";
import * as yup from "yup";
import "@/styles/Client.css";
import { useRouter } from "next/navigation";
import { lengthOptions, modalitiesOptions } from "@/lib/selectConstants";
import Mission from "@/entities/mission";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomAutocomplete from "@/components/common/CustomAutocomplete";
import LevelSelector from "@/components/common/LevelSelector";
import { competences as competenceList } from "@/lib/competences";
import CustomDialog from "@/components/common/CustomDialog";

interface ModifyMissionFormProps {
  mission: Mission;
}

const ModifyMissionForm: React.FC<ModifyMissionFormProps> = ({
  mission: {
    _id,
    title,
    context,
    goals,
    date,
    price,
    length,
    modalities,
    competences,
    hiddenCompany,
    hiddenMissionPlace,
    hiddenTJM,
    aoId,
    postalCode,
    city,
    clientId,
    status,
    companyName,
    propositions
  },
}) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [updatedHiddenCompany, setUpdatedHiddenCompany] =
    useState(hiddenCompany);
  const [updatedHiddenTJM, setUpdatedHiddenTJM] = useState(hiddenTJM);
  const [updatedHiddenMissionPlace, setUpdatedHiddenMissionPlace] =
    useState(hiddenMissionPlace);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    title: title,
    context: context,
    goals: goals,
    date: dayjs(date),
    price: price,
    length: lengthOptions.find((option) => option.label === length)!.value,
    modalities: modalitiesOptions.find((option) => option.label === modalities)!
      .value,
    hiddenCompany: hiddenCompany,
    hiddenTJM: hiddenTJM,
    hiddenMissionPlace: hiddenMissionPlace,
  };

  const [selectedCompetences, setSelectedCompetences] =
    useState<{ label: string; level: number }[]>(competences);

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      const updatedMission = new Mission({
        clientId,
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
        hiddenCompany: values.hiddenCompany,
        hiddenMissionPlace: values.hiddenMissionPlace,
        hiddenTJM: values.hiddenTJM,
        postalCode,
        city,
        aoId,
        status,
        companyName,
        propositions: propositions,
        _id,
      });
      await updatedMission.update();
      router.push(`/client/ao/${_id}`);
      router.refresh();
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
      }) => {
        return (
          <Form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <h5 className="mb-10 cursor-pointer back-button" onClick={handleClickOpen}>
              &#60;- retour aux appels d&apos;offres
            </h5>

            <div className="flex w-full justify-between">
              <div className="flex flex-col w-7/12">
                <h5 className="text-light mb-3">AO 00002</h5>
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

                <div className="flex justify-between mt-5 mb-10">
                  <div
                    className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                      !updatedHiddenCompany
                        ? `hide-button`
                        : "hide-button-focus"
                    }`}
                    onClick={() =>
                      setUpdatedHiddenCompany(!updatedHiddenCompany)
                    }
                  >
                    <h5 className="text-normal text-center">
                      Je cache le nom de la société
                    </h5>
                  </div>
                  <div
                    className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                      !updatedHiddenTJM ? `hide-button` : "hide-button-focus"
                    }`}
                    onClick={() => setUpdatedHiddenTJM(!updatedHiddenTJM)}
                  >
                    <h5 className="text-normal text-center">
                      Je cache le TJM demandé
                    </h5>
                  </div>
                  <div
                    className={`rounded-2xl cursor-pointer w-3/12 p-2 ${
                      !updatedHiddenMissionPlace
                        ? `hide-button`
                        : "hide-button-focus"
                    }`}
                    onClick={() =>
                      setUpdatedHiddenMissionPlace(!updatedHiddenMissionPlace)
                    }
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
                    onChange={(e) =>
                      setFieldValue("modalities", e.target.value)
                    }
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
                <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
                  <p className=" text-xl text-normal">
                    Compétences requises <span className="color-red">*</span>
                  </p>

                  <div className="flex justify-between mt-5 mb-5">
                    <p>Compétences</p>
                    <p>Niveau</p>
                  </div>

                  {selectedCompetences.map((competence, index) => {
                    return (
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
                              const updatedCompetences = [
                                ...selectedCompetences,
                              ];
                              updatedCompetences[index].label = newValue || "";
                              setSelectedCompetences(updatedCompetences);
                            }}
                            options={competenceList}
                          />
                        </div>

                        <div className="w-5/12 flex justify-center lg:w-7/12">
                          <LevelSelector
                            value={competence.level}
                            onChange={(level) => {
                              const updatedCompetences = [
                                ...selectedCompetences,
                              ];
                              updatedCompetences[index].level = level;
                              setSelectedCompetences(updatedCompetences);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className="flex justify-end mt-5 cursor-pointer"
                    onClick={addCompetence}
                  >
                    <p className="text-normal">+ Ajoute une compétence</p>
                  </div>
                </div>
                {formError && <p className="error text-xs">{formError}</p>}
                <button
                  className="my-12 py-5 px-10 submit-button rounded-2xl bg-client"
                  type="submit"
                >
                  <span className="text-xl text-semibold ml-2 mr-2">
                    Enregistrer les modifications
                  </span>
                </button>
              </div>
            </div>

            <CustomDialog open={open} onClose={handleClose}>
              <div className="flex mr-10 ml-5">
                <div className="flex flex-col">
                  <h2 className="text-normal text-xl mr-32 ml-10 mt-10">
                    ⚠️ ATTEND ! Tu as oublié d’enregistrer ! ⚠️
                  </h2>
                  <h5 className="ml-20 text-normal mt-10">
                    Veux-tu continuer tes modifications ?
                  </h5>
                  <div className="flex my-10 ml-10 w-9/12 justify-between">
                    <button
                      className={`rounded-2xl cursor-pointer p-2 w-5/12 hide-button-focus`}
                      onClick={handleClose}
                    >
                      <h5 className="text-normal text-center">
                        Oui, je continue
                      </h5>
                    </button>
                    <button
                      className={`rounded-2xl cursor-pointer p-2 w-5/12 hide-button`}
                      onClick={() => router.push(`/client/ao/${_id}`)}
                    >
                      <h5 className="text-normal text-center">
                        Non, j&apos;ai changé d&apos;avis
                      </h5>
                    </button>
                  </div>
                </div>

                <Image
                  src="/modifyPopup.svg"
                  width={200}
                  height={200}
                  alt="Supprimer AO"
                />
              </div>
            </CustomDialog>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ModifyMissionForm;
