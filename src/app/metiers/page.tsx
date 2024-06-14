import IntroSection from "@/components/home/IntroSection";
import React from "react";
import "@/styles/Portage.css";
import Image from "next/image";
import LongButton from "@/components/common/LongButton";
import Navbar from "@/components/navbar/NavBar";

const Portage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="La société de portage pour les"
          secondTitle="métiers de service"
          undertitle="Découvre les métiers éligibles au portage"
        />

        <div className="main-content px-10">
          <div className="mt-20">
            <p className="text-xl text-light leading-relaxed 2lg:text-base">
              Toutes les sociétés de portage proposent d’accompagner des
              indépendants sur différentes missions. Mais cela ne concerne pas
              tous les métiers. Seuls les métiers de services sont éligibles à
              la société de portage.
              <br />
              Tous les indépendants du service qui souhaitent exercer une
              activité indépendante en conservant la sécurité d’un salarié font
              appel à des sociétés telle que Connect.
              <br />
              <br />
              Voici les métiers phares auxquels les freelances peuvent prétendre
              chez Connect :
            </p>
          </div>

          <div className="flex justify-between mt-20">
            <Image
              src="/expert_IT.svg"
              alt="Freelance expert IT"
              width={350}
              height={200}
            />
            <div className="flex-col flex w-7/12 justify-center 2lg:w-6/12">
              <p className="text-3xl text-semibold mb-10 text-left 2lg:text-2xl">
                Expert en IT
              </p>
              <p className="text-xl mt-4 text-light leading-relaxed mb-10 2lg:text-base">
                Tu es consultant en systèmes d&apos;information, programmeur
                informatique, développeur web ou autre profil d&apos;ingénieur
                informatique ?
                <br />
                Tu souhaites te développer vers un de nos méties informatiques ?{" "}
                <br />
                Découvre les avantages de Connect...
              </p>

              <div className="flex flex-col items-center justify-center">
                <LongButton
                  title="Découvrir le métier"
                  href="/metiers/expert-it"
                  textClassName="text-black font-bold text-xl 2lg:text-base"
                  background="#D892C0C7"
                  className="self-center"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-row-reverse mt-20">
            <Image
              src="/expert_RH.svg"
              alt="Freelance expert RH"
              width={350}
              height={200}
            />
            <div className="flex-col flex w-7/12 justify-center 2lg:w-6/12">
              <p className="text-3xl text-semibold mb-10 text-left 2lg:text-2xl">
                Expert en RH
              </p>
              <p className="text-xl mt-4 text-light leading-relaxed mb-10 2lg:text-base">
                Tu es expert dans un domaine particulier ?
              </p>
              <p className="text-xl mt-4 text-light leading-relaxed mb-10 text-white">
                Tu es consultant en systèmes d&apos;information, programmeur
                informatique, développeur web ou autre profil d&apos;ingénieur
                informatique ?
                <br />
                Tu souhaites te développer vers un de nos méties informatiques ?{" "}
                <br />
                Découvre les avantages de Connect...
              </p>

              <div className="flex flex-col items-center justify-center">
                <LongButton
                  title="Découvrir le métier"
                  href="/metiers/expert-rh"
                  textClassName="text-black font-bold text-xl 2lg:text-base"
                  background="#D892C0C7"
                  className="self-center"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Portage;
