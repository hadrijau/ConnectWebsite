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

        <div className="main-content px-10 3md:px-0 sm:ml-0 sm:mr-0">
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

          <div className="flex justify-between mt-20 sm:mt-10">
            <div className="relative w-[500px] h-[500px] 3md:w-[400px] 3md:h-[400px] md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px] sm:mt-0">
              <Image
                src="/expert_IT.svg"
                alt="Freelance expert IT"
                layout="fill"
              />
            </div>

            <div className="flex-col flex w-7/12 justify-center 2lg:w-6/12 sm:w-9/12">
              <p className="text-3xl text-semibold mb-10 text-left 2lg:text-2xl sm:mb-0">
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

              <div className="flex flex-col items-center justify-center display-computer">
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

          <div className="display-mobile">
            <div className="flex flex-col items-center justify-center mt-5">
              <LongButton
                title="Découvrir le métier"
                href="/metiers/expert-it"
                textClassName="text-black font-bold text-xl 2lg:text-base"
                background="#D892C0C7"
                className="self-center items-center"
              />
            </div>
          </div>

          <div className="flex justify-between flex-row-reverse mt-20">
            <div className="relative w-[500px] h-[500px] 3md:w-[400px] 3md:h-[400px]  md:w-[300px] md:h-[300px] sm:w-[200px] sm:h-[200px] sm:mt-0">
              <Image
                src="/expert_RH.svg"
                alt="Freelance expert RH"
                layout="fill"
              />
            </div>

            <div className="flex-col flex w-7/12 justify-center 2lg:w-6/12 sm:w-9/12">
              <p className="text-3xl text-semibold mb-10 text-left 2lg:text-2xl sm:mb-0">
                Expert en RH
              </p>
              <p className="text-xl mt-4 text-light leading-relaxed mb-10 2lg:text-base">
                Tu es expert dans un domaine particulier ?
              </p>
              <p className="text-xl mt-4 text-light leading-relaxed mb-10 text-white display-computer">
                Tu es consultant en systèmes d&apos;information, programmeur
                informatique, développeur web ou autre profil d&apos;ingénieur
                informatique ?
                <br />
                Tu souhaites te développer vers un de nos méties informatiques ?{" "}
                <br />
                Découvre les avantages de Connect...
              </p>

              <div className="flex flex-col items-center justify-center display-computer">
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

          <div className="display-mobile">
            <div className="flex flex-col items-center justify-center mt-5">
              <LongButton
                title="Découvrir le métier"
                href="/metiers/expert-rh"
                textClassName="text-black font-bold text-xl 2lg:text-base"
                background="#D892C0C7"
                className="self-center items-center"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Portage;
