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
import Mission, { MissionStatus } from "@/entities/mission";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import CompetencesSelection from "./CompetencesSelection";
import MissionFormCommon from "./ MissionFormCommon";

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
          <Link href="/client/ao">
            <h5 className="mb-10">&#60;- retour</h5>
          </Link>
          <MissionFormCommon
            values={values}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            hiddenCompany={hiddenCompany}
            setHiddenTJM={setHiddenTJM}
            hiddenMissionPlace={hiddenMissionPlace}
            setHiddenMissionPlace={setHiddenMissionPlace}
            setHiddenCompany={setHiddenCompany}
            hiddenTJM={hiddenTJM}
            lastAOId={user.lastAOId}
            city={user.city}
            postalCode={user.postalCode}
            selectedCompetences={selectedCompetences}
            setSelectedCompetences={setSelectedCompetences}
            addCompetence={addCompetence}
            formError={formError!}
            loading={loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateMissionForm;
