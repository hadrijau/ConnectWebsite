"use client";
import React from "react";
import CustomSelect from "@/components/common/CustomSelect";
import "@/styles/Client.css";
import { useRouter } from "next/navigation";
import { refusalsOptions } from "@/lib/selectConstants";
import Mission from "@/entities/mission";
import { Formik, Form } from "formik";
import Freelance from "@/entities/freelance";
import { deleteProposition } from "@/http/mission";

interface RefuseFreelanceCandidatureFormProps {
  mission: Mission;
  freelance: Freelance;
}

const RefuseFreelanceCandidatureForm: React.FC<
  RefuseFreelanceCandidatureFormProps
> = ({ freelance, mission }) => {
  const router = useRouter();

  const initialValues = {
    reason: 10,
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    console.log("heyyy")
    const deleteResult = await deleteProposition(mission._id, freelance._id);
    if (!deleteResult.success) {
      console.log("Error deleting proposition");
    }
    const updatedFreelance = new Freelance({
        ...freelance,
        missionsLost: [...freelance.missionsLost, mission._id],
    });
    updatedFreelance.update();
    router.refresh();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleFormSubmit(values);
      }}
    >
      {({ values, handleBlur, setFieldValue, handleSubmit }) => {
        return (
          <Form className="flex flex-col w-full p-10" onSubmit={handleSubmit}>
            <h5 className="text-center font-pink font-bold">
              {" "}
              Non intéressant ?
            </h5>
            <p className="text-light text-center my-5">
              Veux tu qualifier
              <span className="font-pink text-bold">
                {` ${freelance.firstname} ${freelance.lastname}`}
              </span>
              <br />
              comme non intéressant pour l'offre ?
            </p>
            <p className="text-light text-center mb-5">Pour quelle raison ?</p>
            <CustomSelect
              name="refusalReason"
              value={values.reason}
              onChange={(e) => setFieldValue("reason", e.target.value)}
              onBlur={handleBlur}
              options={refusalsOptions}
              placeholder="Sélectionner une raison"
            />
            <div className="flex justify-end">
              <button className="font-pink font-bold mt-10" type="submit">
                <span className="text text-semibold ml-2 mr-2">Ok</span>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RefuseFreelanceCandidatureForm;
