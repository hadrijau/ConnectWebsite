"use client";
import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import TextInput from "@/components/common/TextInput";
import "@/styles/Freelance.css";
import Mission from "@/entities/mission";
import CompetencesContainer from "@/components/common/CompetencesContainer";
import * as yup from "yup";
import CustomDateField from "../common/CustomDateField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Proposition, {
  ClientStatus,
  FreelanceStatus,
} from "@/entities/proposition";
import { useSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import Freelance from "@/entities/freelance";
import CVUpload from "../upload/CVUpload";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { Dayjs } from "dayjs";
interface AnswerMissionProps {
  mission: Mission;
  freelance: Freelance;
}

const AnswerMission: React.FC<AnswerMissionProps> = ({
  mission,
  freelance,
}) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const router = useRouter();

  const missionDate = dayjs(mission.date).toDate();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    whyMe: yup.string().required("Ce champ est obligatoire"),
    disponiblity: yup.string().required("Tes dispobilités sont obligatoires"),
    freelanceProposedPrice: yup
      .number()
      .required("Le prix est obligatoire")
      .min(0, "Le prix ne peut pas être négatif"),
  });

  const initialValues = {
    whyMe: "",
    disponiblity: dayjs(new Date()),
    freelanceProposedPrice: "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    const proposition = new Proposition({
      missionId: String(mission._id!),
      freelanceId: String(freelance._id),
      clientStatus: ClientStatus.UNOPENED,
      freelanceStatus: FreelanceStatus.ONGOING,
      cv: freelance.cv,
      whyMe: values.whyMe,
      freelance: `${freelance.firstname} ${freelance.lastname}`,
      freelanceEnterprise: freelance.enterprise,
      freelanceDisponibility: values.disponiblity,
      clientDisponibility: mission.date,
      city: mission.city,
      clientProposedPrice: Number(mission.price),
      freelanceProposedPrice: Number(values.freelanceProposedPrice),
      modalities: mission.modalities,
      title: mission.title,
      companyName: mission.companyName,
      length: mission.length,
    });
    await proposition.save();
    router.push("/freelance/ao/propositions");
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleFormSubmit(values);
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
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <div className="flex-col w-7/12">
                <div className="flex items-center mb-4">
                  <Image
                    src="/logoSoge.svg"
                    width={150}
                    height={150}
                    alt="Logo société générale"
                  />
                  <div className="flex-col ml-10">
                    <h4 className="text-normal text-2xl">{mission.title}</h4>
                    <h5 className="text-light mb-3 text-xl">AO 00002</h5>
                  </div>
                </div>

                <div className="flex flex-col mt-16">
                  <h5 className="why-me-text text-2xl mb-5">
                    Pourquoi toi et pas un autre ? (*)
                  </h5>
                  <TextInput
                    name="whyMe"
                    type="text"
                    multiline
                    rows={10}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.whyMe}
                    error={touched.whyMe && Boolean(errors.whyMe)}
                    helperText={touched.whyMe && errors.whyMe}
                    placeholder="Quelles sont tes forces ? Quelles sont tes expériences significatives pouvant faire pencher la balance ?"
                  />

                  <div className="flex">
                    <div className="mt-8 w-5/12 flex-col">
                      <h5 className="text-xl">
                        Disponilbités{" "}
                        <span style={{ color: "#B9D386", fontWeight: "bold" }}>
                          *
                        </span>
                      </h5>
                      <div className="w-8/12 my-5 px-2">
                        <Field
                          name="date"
                          component={CustomDateField}
                          value={values.disponiblity}
                          onChange={(value: Dayjs | null) =>
                            setFieldValue("date", value)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.disponiblity && Boolean(errors.disponiblity)
                          }
                          helperText={
                            touched.disponiblity && errors.disponiblity
                          }
                          placeholder="Sélectionner une date*"
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <h5 className="text-xl">
                        Montant que je souhaite percevoir (HT){" "}
                        <span style={{ color: "#B9D386", fontWeight: "bold" }}>
                          *
                        </span>
                      </h5>
                      <div className="flex items-center my-5">
                        <div className="w-12/12">
                          <TextInput
                            name="freelanceProposedPrice"
                            placeholder=""
                            type="number"
                            error={
                              touched.freelanceProposedPrice &&
                              Boolean(errors.freelanceProposedPrice)
                            }
                            helperText={
                              touched.freelanceProposedPrice &&
                              errors.freelanceProposedPrice
                            }
                            value={values.freelanceProposedPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-2xl mr-5"
                          />
                        </div>

                        <h5 className="ml-2">€ par jour</h5>
                      </div>
                    </div>
                  </div>

                  <div className="w-5/12 mt-12">
                    <CVUpload freelance={freelance} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-4/12">
                <div className="flex my-2">
                  <Image
                    src="/freelanceMissionCalendar.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
                  />
                  {missionDate
                    .toLocaleDateString("fr-FR")
                    .replaceAll("/", ".")}
                </div>
                <div className="flex my-2">
                  <Image
                    src="/freelanceMissionPrice.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
                  />
                  <p className="mt-2">{mission.price} € HT/jour</p>
                </div>
                <div className="flex my-2">
                  <Image
                    src="/freelanceMissionTime.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
                  />
                  {mission.length}
                </div>
                <div className="flex my-2">
                  <Image
                    src="/freelanceMissionPropositions.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
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
                    {mission.city}, {mission.postalCode}
                  </p>
                </div>
                <CompetencesContainer
                  competences={mission.competences}
                  freelance={true}
                />

                <div className="flex my-10 items-center justify-center">
                  {isLoading ? (
                    <CircularProgress size={40} />
                  ) : (
                    <button
                      className="my-12 py-5 px-10 rounded-2xl bg-freelance text-xl text-semibold ml-2 mr-2"
                      type="submit"
                    >
                      Envoyer
                    </button>
                  )}

                  <Image
                    src="/freelanceSendMission.svg"
                    height={200}
                    width={200}
                    alt="calendrier"
                    className="mr-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AnswerMission;
