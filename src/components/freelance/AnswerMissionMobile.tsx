"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import TextInput from "@/components/common/TextInput";
import "@/styles/Freelance.css";
import Mission, { ClientStatus, Proposition } from "@/entities/mission";
import CompetencesContainer from "@/components/common/CompetencesContainer";
import * as yup from "yup";
import CustomDateField from "../common/CustomDateField";
import { Formik, Form, Field } from "formik";
import Freelance from "@/entities/freelance";
import CVUpload from "../upload/CVUpload";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { Dayjs } from "dayjs";

interface AnswerMissionMobileProps {
  mission: Mission;
  freelance: Freelance;
}

const AnswerMissionMobile: React.FC<AnswerMissionMobileProps> = ({
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
    const proposition: Proposition = {
      missionId: String(mission._id!),
      freelanceId: String(freelance._id),
      whyMe: values.whyMe,
      freelanceDisponibility: values.disponiblity,
      freelanceProposedPrice: Number(values.freelanceProposedPrice),
      status: ClientStatus.UNOPENED,
    };

    const updatedMissionWithProposition = new Mission({
      ...mission,
      propositions: [...mission.propositions, proposition],
    });
    await updatedMissionWithProposition.update();
    const updatedFreelance = new Freelance({
      ...freelance,
      missionsPendingApproval: [
        ...freelance.missionsPendingApproval,
        mission._id!,
      ],
    });
    updatedFreelance.update();
    router.push("/freelance/ao/propositions");
  };

  const scrollRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleAddLikeMission = async () => {
    const updatedFreelance = new Freelance({
      ...freelance,
      missionsLiked: [...freelance.missionsLiked, mission._id!],
    });
    updatedFreelance.update();
    router.push("/freelance/ao/cheris");
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
        <Form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}
          ref={scrollRef}
        >
          <div className="flex flex-col w-full">
            <div className="flex-col">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src="/logoSoge.svg"
                    width={150}
                    height={150}
                    alt="Logo société générale"
                  />
                  <div className="flex-col ml-10 sm:ml-0">
                    <h4 className="text-normal text-2xl">{mission.title}</h4>
                    <h5 className="text-light mb-3 text-xl">{mission.aoId}</h5>
                  </div>
                </div>

                <Image
                  src="/likeMissionFreelance.svg"
                  alt="Like Mission"
                  width={40}
                  height={40}
                  className="mr-10 sm:mr-0"
                  onClick={handleAddLikeMission}
                />
              </div>
              <div className="flex my-2 justify-end">
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
              <div className="flex justify-between my-4">
                <div className="flex-col">
                  <div className="flex my-2">
                    <Image
                      src={"/freelanceMissionCalendar.svg"}
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
                      src={"/freelanceMissionPrice.svg"}
                      height={25}
                      width={25}
                      alt="calendrier"
                      className="mr-4"
                    />
                    <p className="mt-2">{mission.price} € HT/jour</p>
                  </div>
                </div>

                <div className="flex-col">
                  <div className="flex my-2">
                    <Image
                      src={"/freelanceMissionTime.svg"}
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
                    <p className="mt-2">
                      {mission.propositions.length} propositions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-16">
                <h5 className="why-me-text text-2xl mb-5 text-extra-bold sm:text-xl">
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

                <div className="flex-col">
                  <div className="mt-8 w-5/12 flex-col sm:w-8/12">
                    <h5 className="text-xl text-normal xs:text-lg">
                      Disponibilités{" "}
                      <span style={{ color: "#B9D386", fontWeight: "bold" }}>
                        *
                      </span>
                    </h5>
                    <div className="w-8/12 my-5">
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
                        helperText={touched.disponiblity && errors.disponiblity}
                        placeholder="Sélectionner une date*"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h5 className="text-xl text-normal xs:text-lg">
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

                <div className="w-5/12 mt-12 sm:w-10/12">
                  <CVUpload freelance={freelance} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end">
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
        </Form>
      )}
    </Formik>
  );
};

export default AnswerMissionMobile;
