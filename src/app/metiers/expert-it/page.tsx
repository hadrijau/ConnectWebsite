import IntroSection from "@/components/home/IntroSection";
import React from "react";
import "@/styles/Portage.css";
import Image from "next/image";
import Navbar from "@/components/navbar/NavBar";
import LongButton from "@/components/common/LongButton";

const ExpertITPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="La société de portage pour les"
          secondTitle="métiers de service"
          undertitle="Découvre les métiers éligibles au portage"
        />
        <div className="px-20">
          <h1 className="text-semibold text-7xl mt-20 mb-10">Expert en IT</h1>
          <h5 className="text-light text-xl mb-5">
            Le marché de l’IT et du multimédia est en pleine évolution et se
            spécialise. En effet, ce secteur, qui comprend les technologies de
            l&apos;information et des télécommunications, répond à des méthodes
            de travail spécifiques.{" "}
          </h5>
          <h5 className="text-light text-xl mb-5">
            L&apos;activité de ce métier s&apos;exerce au sein
            d&apos;entreprises utilisatrices, de services et de conseil, de
            constructeurs informatiques, ... en relations avec différents
            services (Direction des Systèmes d&apos;Information,
            production/exploitation, études et développement, maintenance, ...),
            en contact avec de multiples intervenants (chef de projet MOA,
            utilisateurs, ...).
          </h5>
          <div className="flex">
            <div className="flex-col">
              <p className="text-light text-xl">
                Le rôle du consultant informatique est de concevoir et mettre en
                place un système d’information entièrement sécurisé, adapté aux
                besoins de l’entreprise. Pour cela, plusieurs missions lui
                incombent :
              </p>

              <ul className="mb-5">
                <li className="text-light text-xl">
                  Déterminer les besoins des clients{" "}
                </li>
                <li className="text-light text-xl">
                  Analyser le système d’information déjà en place
                </li>
                <li className="text-light text-xl">
                  Évaluer les différentes solutions possibles
                </li>
                <li className="text-light text-xl">
                  Proposer les solutions au client en apportant des conseils
                </li>
                <li className="text-light text-xl">
                  Accompagner l’entreprise lors de la mise en place du nouveau
                  système.
                </li>
              </ul>
              <p className="text-light text-xl">
                Le consultant informatique est donc en charge de la conception,
                de l’installation et de la maintenance du système, mais
                également du suivi et de la formation du personnel sur
                l’utilisation des outils.
              </p>
              <p className="text-light text-xl mb-5">
                Avec de l’expérience et un travail de qualité, tu auras la
                possibilité d’évoluer rapidement. Tes missions vont se
                complexifier et les responsabilités augmenteront.
              </p>
              <p className="text-light text-xl mb-5">
                Ainsi, un consultant informatique en interne peut espérer
                devenir chef de projet informatique ou responsable de service
                informatique, ou se lancer à son compte grâce au réseau tissé
                auprès des clients satisfaits.
              </p>
            </div>

            <div className="expert-it-img-container">
              <Image
                src="/expert_IT.svg"
                alt="Expert IT"
                width={700}
                height={100}
                className="it-img"
              />
              <h5 className="text-it text-white text-semi-bold text-xl text-center">
                Tu veux devenir consultant en informatique mais tu ne sais pas
                par où commencer ?
              </h5>
              <LongButton
                title="Un rendez-vous personnalisé"
                href=""
                className="btn-expert-it"
                textClassName="text-white text-semibold text-sm"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExpertITPage;
