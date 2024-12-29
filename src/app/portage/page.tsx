"use client";
import IntroSection from "@/components/home/IntroSection";
import React, { useState, useEffect } from "react";
import "@/styles/Portage.css";
import Navbar from "@/components/navbar/NavBar";
import MobileIntroSection from "@/components/common/MobileIntroSection";

const PortagePage = () => {
  const [activeQuestion, setActiveQuestion] = useState("");

  useEffect(() => {
    if (activeQuestion) {
      const questionElement = document.getElementById(activeQuestion);
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        setTimeout(() => {
          window.scrollBy(0, -100);
        }, 800);
      }
    }
  }, [activeQuestion]);

  const handleQuestionClick = (question: string) => {
    setActiveQuestion(question);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="Connect, la société de portage à"
          secondTitle="taille humaine"
          undertitle="Glisse vers toutes les opportunités"
        />

        <MobileIntroSection
          firstTitle="Connect, la société de portage à taille humaine"
          secondTitle="Késako ?"
          client={true}
          freelance={true}
        />
        <div className="main-content px-10 sm:px-0 sm:ml-0 sm:mr-0">
          <h1 className="header-title-text text-center mb-20 text-bold mt-20 sm:w-full">
            Tout savoir sur les sociétés de portage salarial
          </h1>

          <div className="flex justify-between relative">
            <div className="w-7/12 sm:w-full">
              <div className="portage-section" id="section-1">
                <h1 className="undertitle-text portage-title">
                  ❓ Qu’est-ce qu’une société de portage ?
                </h1>
                <p className="undertitle-text portage-paragraph">
                  Une société de portage est experte dans un ou plusieurs
                  domaines. Connecte jongle entre ses différentes experitises
                  technologiques, banquaires, financiaires et d’assurance.
                  Relation tripartite, la société de portage a un lien direct
                  avec le salarié porté et le client. En effet, le portage
                  salarial permet au client de trouver un candidat compétent
                  pour des courts ou moyens projets. Pour le salarié porté, le
                  portage salarial permet à ce dernier d’être totalement
                  indépendant tout en gardant un statut de salarié.
                </p>
              </div>

              <div className="portage-section py-10 sm:py-5" id="section-2">
                <h1 className="undertitle-text portage-title">
                  {" "}
                  🦋 Comment fonctionne le statut de portage salarial ?
                </h1>
                <p className="undertitle-text portage-paragraph">
                  La relation tripartite entre la société de portage, le salarié
                  porté ainsi que le client est simple à comprendre. Pour cela
                  je t’invite à aller voir le schéma représentatif dans la
                  partie “indépendant”. Le salarié porté est relié à sa société
                  de portage grâce à un contrat de travail (CDD ou CDI) et celui
                  ci est relié a son client par un contrat commercial.
                </p>{" "}
                <br className="mb-10" />
                <span className="text-semibold mt-10 undertitle-text">
                  Comment ça marche ?
                </span>{" "}
                <br />
                <p className="undertitle-text portage-paragraph">
                  Une entreprise a un besoin en expertise et fait appel à un
                  intervenant. Cet même intervenant convient avec le client de
                  son tarif, le montant des frais, la durée .... La prestation
                  entre ces 2 parties se est formalisée par la société de
                  portage. <br /> C’est ensuite au salarié porté d’exécuter sa
                  mission auprès du client. En fin de mois, ce dernier déclarera
                  son activité (nombre de jours ouvrés dans le mois) et la
                  société de portage se chargera de facturer les sommes
                  correspondantes. Le travailleur choisit alors de se rémunérer
                  sur le rendement total ou partiel de son travail (capacité de
                  réduire le salaire). Une fiche de paie lui sera envoyée.{" "}
                  <br />
                  On estime que la partie administrative représente environ un
                  tiers du temps de travail d&apos;un freelance. Par conséquent,
                  choisir une société de portage salarial est un gain de temps
                  non négligeable.
                </p>
              </div>

              <div className="portage-section py-10 sm:py-5" id="section-3">
                <h1 className="undertitle-text portage-title">
                  {" "}
                  📌 Quelles étapes pour être salarié porté ?{" "}
                </h1>
                <p className="undertitle-text portage-paragraph">
                  • Sélectionner l’entreprise de portage : Renseignez vous en
                  amont, faites une simulation, échangez avec le service client
                  si besoin, sélectionnez les entreprises qui vous intéressent.
                  Vous avez choisi celle qui vous correspond ? Contactez là afin
                  de lui demander de porter votre première mission.{" "}
                </p>{" "}
                <br />{" "}
                <p className="undertitle-text portage-paragraph">
                  • Contractualiser la mission : Demandez à l’entreprise de
                  portage un modèle de contrat commercial ou de prestation de
                  services. Vous pourrez ainsi le transmettre à votre client
                  afin qu’il le signe et que la mission puisse démarrer. • Mise
                  en place de votre contrat de travail : Une fois votre mission
                  contractualisée, la société de portage vous mettra à
                  disposition votre contrat de travail (CDD ou CDI), selon les
                  paramètres validés ensemble.
                </p>
              </div>

              <div className="portage-section py-10 sm:py-5" id="section-4">
                <h1 className="undertitle-text portage-title">
                  {" "}
                  👍 Quels sont les avantages du portage salarial ?
                </h1>
                <p className="undertitle-text portage-paragraph">
                  Gain de temps : Que ce soit pour l’entreprise cliente ou le
                  salarié porté, le portage salarial est bénéfique. <br /> La
                  société de portage établit rapidement le contrat de travail et
                  prend en charge directement l’administratif du salarié. Un
                  contrat de travail établit rapidement, c’est une mission qui
                  commence à la hâte.{" "}
                </p>

                <p className="undertitle-text portage-paragraph mt-6">
                  Gain d’argent : En effet, l’expertise se fait rare et elle a
                  un coût. C’est pour cela que la société de portage met à
                  disposition de l’entreprise cliente, un vivier de candidats
                  correspondants aux besoins recherchés. D’autres part, cela
                  diminue le coût de recrutement qu’elle pourrait avoir.
                </p>
                <p className="undertitle-text portage-paragraph mt-6">
                  Diverses protections pour le salarié : La société de portage a
                  pour obligation de porter une garantie financière au salarié
                  en cas de défaillance de la société; le salaire sera toujours
                  automatiquement versé. Aussi, le salarié indépendant a tous
                  les avantages salarial tels la mutuelle, la sécurité sociale,
                  chômage, tickets restaurant ...
                </p>
                <p className="undertitle-text portage-paragraph mt-6">
                  Revenus stabilisés : Le revenu du salarié porté est choisi en
                  fonction de son volume d’activité. Ainsi, il peut se rémunérer
                  tous les mois en lissant son salaire même lorsqu’il n’est plus
                  en mission. Droit à la formation : Comme tous employés, le
                  salarié porté à un droit à la formation (CPF).
                </p>
              </div>

              <div className="portage-section py-10 sm:py-5" id="section-5">
                <h1 className="undertitle-text portage-title">
                  {" "}
                  👎 Quels sont les inconvénients du portage salarial ?{" "}
                </h1>
                <p className="undertitle-text portage-paragraph">
                  L’accessibilité métier : Le portage salarial est accessible
                  uniquement aux métiers de service donc offre un choix
                  restreint. De plus, les métiers de services à la personne ne
                  peuvent pas non plus y prétendre. Frais : ?
                </p>
              </div>
              <div className="portage-section sm:py-5" id="section-6">
                <h1 className="undertitle-text portage-title ">
                  {" "}
                  💸 A quel salaire pourrais je prétendre en portage salarial ?
                </h1>
                <p className="undertitle-text portage-paragraph">
                  Les canaux de communication ne cessent d’évoluer. Vous pensez
                  qu’il suffit de prendre les textes d’une brochure pour
                  alimenter votre site internet par exemple… bien tenté, mais ça
                  ne fonctionne pas comme cela ! La rédaction permet de toucher
                  votre cible, de communiquer une information nécessaire sans
                  trop d’artifices pour ne pas lasser le lecteur. Le style
                  d’écriture doit s’adapter au support, qu’il s’agisse d’une
                  story, de supports print ou web. La rédaction web nécessite
                  des codes dans le but d’optimiser votre référencement, le
                  littéraire doit alors laisser place à l’efficacité.
                </p>
              </div>
            </div>
            <div className="question-section w-4/12 display-computer">
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-1")}
              >
                ❓ Qu’est-ce qu’une société de portage ?
              </p>
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-2")}
              >
                🦋 Comment fonctionne le statut de portage salarial ?
              </p>
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-3")}
              >
                📌 Quelles étapes pour être salarié porté ?
              </p>
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-4")}
              >
                👍 Quels sont les avantages du portage salarial ?
              </p>
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-5")}
              >
                👎 Quels sont les inconvénients du portage salarial ?
              </p>
              <p
                className="undertitle-text my-6 cursor-pointer"
                onClick={() => handleQuestionClick("section-6")}
              >
                💸 A quel salaire pourrais je prétendre en portage salarial ?
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PortagePage;
