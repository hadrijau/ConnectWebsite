"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import * as yup from "yup";
import "@/styles/Client.css";
import { useRouter } from "next/navigation";
import { lengthOptions, modalitiesOptions } from "@/lib/selectConstants";
import Mission from "@/entities/mission";
import { Formik, Form } from "formik";
import CustomDialog from "@/components/common/CustomDialog";
import MissionFormCommonMobile from "@/components/forms/MissionFormCommonMobile";

interface ModifyMissionFormMobileProps {
  mission: Mission;
}

const ModifyMissionFormMobile: React.FC<ModifyMissionFormMobileProps> = ({
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
    propositions,
    acceptedFreelanceId,
  },
}) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [updatedHiddenCompany, setUpdatedHiddenCompany] =
    useState(hiddenCompany);
  const [updatedHiddenTJM, setUpdatedHiddenTJM] = useState(hiddenTJM);
  const [updatedHiddenMissionPlace, setUpdatedHiddenMissionPlace] =
    useState(hiddenMissionPlace);

  const [open, setOpen] = useState(false);

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
    setLoading(true);
    try {
      const updatedMission = new Mission({
        acceptedFreelanceId,
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
      setLoading(false);
    } catch (err) {
      console.log("Error creating mission", err);
      setLoading(false);
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

  const [loading, setLoading] = useState(false);

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
            <h5
              className="mb-10 cursor-pointer back-button"
              onClick={handleClickOpen}
            >
              &#60;- retour aux appels d&apos;offres
            </h5>

            <MissionFormCommonMobile
              values={values}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              hiddenCompany={hiddenCompany}
              setHiddenTJM={setUpdatedHiddenTJM}
              hiddenMissionPlace={hiddenMissionPlace}
              setHiddenMissionPlace={setUpdatedHiddenMissionPlace}
              setHiddenCompany={setUpdatedHiddenCompany}
              hiddenTJM={hiddenTJM}
              lastAOId={aoId}
              city={city}
              postalCode={postalCode}
              selectedCompetences={selectedCompetences}
              setSelectedCompetences={setSelectedCompetences}
              addCompetence={addCompetence}
              formError={formError!}
              loading={loading}
              textSubmit="Enregistrer les modifications"
            />

            <CustomDialog open={open} onClose={handleClose}>
              <div className="flex mr-10 ml-5 items-center realtive">
                <div className="flex flex-col">
                  <h2 className="text-normal text-lg text-center mt-10">
                    ⚠️ ATTEND ! Tu as oublié d’enregistrer ! ⚠️
                  </h2>
                  <h5 className="text-center text-normal mt-10">
                    Veux-tu continuer tes modifications ?
                  </h5>
                  <div className="flex my-10 mr-10">
                    <button
                      className={`rounded-2xl cursor-pointer p-2 w-5/12 mr-5 hide-button-focus`}
                      onClick={handleClose}
                    >
                      <h5 className="text-normal text-center text-sm">
                        Oui, je continue
                      </h5>
                    </button>
                    <button
                      className={`rounded-2xl cursor-pointer p-2 w-5/12 hide-button`}
                      onClick={() => router.push(`/client/ao/${_id}`)}
                    >
                      <h5 className="text-normal text-center text-sm">
                        Non, j&apos;ai changé d&apos;avis
                      </h5>
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-6 right-2">
                  <div className="w-24 h-24 relative">
                    <Image
                      src="/modifyPopup.svg"
                      layout="fill"
                      alt="Supprimer AO"
                    />
                  </div>
                </div>
              </div>
            </CustomDialog>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ModifyMissionFormMobile;
