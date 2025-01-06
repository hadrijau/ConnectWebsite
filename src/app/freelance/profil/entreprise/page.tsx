import React from "react";
import NavBarProfile from "@/components/profile/NavBarProfileFreelance";
import EntrepriseFreelanceForm from "@/components/forms/EntrepriseFreelanceForm";
import { auth } from "@/auth";
import { getFreelanceByEmail } from "@/http/freelance";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";

const EntrepriseFreelancePage = async () => {
  const session = await auth();
  const user = await getFreelanceByEmail(session?.user?.email!);

  return (
    <div className="flex min-h-screen">
      <NavBarProfile className="w-4/12 3md:hidden" user={user} />
      <div className="display-tablet-mobile">
        <FreelanceNavBar />
      </div>
      <div className="flex-col w-8/12 3md:w-full 3md:mt-20">
        <div className="flex justify-end">
          <h5 className="font-bad-script text-2xl mt-10 mr-10">
            Work in progress
          </h5>
        </div>
        <div className="flex-col mt-5 ml-20 3md:ml-10">
          <h1 className="font-bold text-3xl font-green">Mon entreprise</h1>
          <h5 className="font-normal text-xl mt-5">
            Encore un petit effort ...
          </h5>

          <p className="my-10">
            <span className="font-bold">
              Tu es déjà dans une entreprise ? Indique nous laquelle !{" "}
            </span>
          </p>

          <EntrepriseFreelanceForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default EntrepriseFreelancePage;
