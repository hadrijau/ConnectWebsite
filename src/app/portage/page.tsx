import IntroSection from "@/components/home/IntroSection";
import React from "react";
import "@/styles/Portage.css";
import Navbar from "@/components/navbar/NavBar";

const Portage = () => {
  return (
    <>
    <Navbar />
    <main className="flex flex-col items-center justify-between">
      <IntroSection
        firstTitle="Connect, la société de portage à"
        secondTitle="taille humaine"
        undertitle="Glissez vers toutes les opportunités"
        image="/sectionPortage.svg"
        background="linear-gradient(135deg, #79B3D1 0%, #D892C0 100%)"
      />
      <h1 className="text-4xl text-center mb-20 text-bold mt-10">
        Tout savoir sur les sociétés de portage salarial
      </h1>

      <div className="flex justify-between px-20">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            ❓ Qu’est-ce qu’une société de portage ?
          </h1>
          <p className="text-xl portage-paragraph">
            Une société de portage est experte dans un ou plusieurs domaines.
            Connecte jongle entre ses différentes experitises technologiques,
            banquaires, financiaires et d’assurance. Relation tripartite, la
            société de portage a un lien direct avec le salarié porté et le
            client. En effet, le portage salarial permet au client de trouver un
            candidat compétent pour des courts ou moyens projets. Pour le
            salarié porté, le portage salarial permet à ce dernier d’être
            totalement indépendant tout en gardant un statut de salarié.
          </p>
        </div>
        <div className="question-section">
          <p className="text-xl my-6">
            ❓ Qu’est-ce qu’une société de portage ?
          </p>
          <p className="text-xl my-6">
            🦋 Comment fonctionne le statut de portage salarial ?
          </p>
          <p className="text-xl my-6">
            📌 Quelles étapes pour être salarié porté ?
          </p>
          <p className="text-xl my-6">
            👍 Quels sont les avantages du portage salarial ?
          </p>
          <p className="text-xl my-6">
            👎 Quels sont les inconvénients du portage salarial ?
          </p>
          <p className="text-xl my-6">
            💸 A quel salaire pourrais je prétendre en portage salarial ?
          </p>
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            {" "}
            🦋 Comment fonctionne le statut de portage salarial ?
          </h1>
          <p className="text-xl portage-paragraph">
            La relation tripartite entre la société de portage, le salarié porté
            ainsi que le client est simple à comprendre. Pour cela je t’invite à
            aller voir le schéma représentatif dans la partie “indépendant”. Le
            salarié porté est relié à sa société de portage grâce à un contrat
            de travail (CDD ou CDI) et celui ci est relié a son client par un
            contrat commercial.
          </p>{" "}
          <br className="mb-10" />
          <span className="text-semibold mt-10 text-xl">
            Comment ça marche ?
          </span>{" "}
          <br />
          <p className="text-xl portage-paragraph">
            Une entreprise a un besoin en expertise et fait appel à un
            intervenant. Cet même intervenant convient avec le client de son
            tarif, le montant des frais, la durée .... La prestation entre ces 2
            parties se est formalisée par la société de portage. <br /> C’est
            ensuite au salarié porté d’exécuter sa mission auprès du client. En
            fin de mois, ce dernier déclarera son activité (nombre de jours
            ouvrés dans le mois) et la société de portage se chargera de
            facturer les sommes correspondantes. Le travailleur choisit alors de
            se rémunérer sur le rendement total ou partiel de son travail
            (capacité de réduire le salaire). Une fiche de paie lui sera
            envoyée. <br />
            On estime que la partie administrative représente environ un tiers
            du temps de travail d&apos;un freelance. Par conséquent, choisir une
            société de portage salarial est un gain de temps non négligeable.
          </p>
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            {" "}
            📌 Quelles étapes pour être salarié porté ?{" "}
          </h1>
          <p className="text-xl portage-paragraph">
            • Sélectionner l’entreprise de portage : Renseignez vous en amont,
            faites une simulation, échangez avec le service client si besoin,
            sélectionnez les entreprises qui vous intéressent. Vous avez choisi
            celle qui vous correspond ? Contactez là afin de lui demander de
            porter votre première mission.{" "}
          </p>{" "}
          <br />{" "}
          <p className="text-xl portage-paragraph">
            • Contractualiser la mission : Demandez à l’entreprise de portage un
            modèle de contrat commercial ou de prestation de services. Vous
            pourrez ainsi le transmettre à votre client afin qu’il le signe et
            que la mission puisse démarrer. • Mise en place de votre contrat de
            travail : Une fois votre mission contractualisée, la société de
            portage vous mettra à disposition votre contrat de travail (CDD ou
            CDI), selon les paramètres validés ensemble.
          </p>
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            {" "}
            👍 Quels sont les avantages du portage salarial ?
          </h1>
          <p className="text-xl portage-paragraph">
            Gain de temps : Que ce soit pour l’entreprise cliente ou le salarié
            porté, le portage salarial est bénéfique. <br /> La société de
            portage établit rapidement le contrat de travail et prend en charge
            directement l’administratif du salarié. Un contrat de travail
            établit rapidement, c’est une mission qui commence à la hâte.{" "}
          </p>

          <p className="text-xl portage-paragraph mt-6">
            Gain d’argent : En effet, l’expertise se fait rare et elle a un
            coût. C’est pour cela que la société de portage met à disposition de
            l’entreprise cliente, un vivier de candidats correspondants aux
            besoins recherchés. D’autres part, cela diminue le coût de
            recrutement qu’elle pourrait avoir.
          </p>
          <p className="text-xl portage-paragraph mt-6">
            Diverses protections pour le salarié : La société de portage a pour
            obligation de porter une garantie financière au salarié en cas de
            défaillance de la société; le salaire sera toujours automatiquement
            versé. Aussi, le salarié indépendant a tous les avantages salarial
            tels la mutuelle, la sécurité sociale, chômage, tickets restaurant
            ...
          </p>
          <p className="text-xl portage-paragraph mt-6">
            Revenus stabilisés : Le revenu du salarié porté est choisi en
            fonction de son volume d’activité. Ainsi, il peut se rémunérer tous
            les mois en lissant son salaire même lorsqu’il n’est plus en
            mission. Droit à la formation : Comme tous employés, le salarié
            porté à un droit à la formation (CPF).
          </p>
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            {" "}
            👎 Quels sont les inconvénients du portage salarial ?{" "}
          </h1>
          <p className="text-xl portage-paragraph">
            L’accessibilité métier : Le portage salarial est accessible
            uniquement aux métiers de service donc offre un choix restreint. De
            plus, les métiers de services à la personne ne peuvent pas non plus
            y prétendre. Frais : ?
          </p>
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <div className="portage-section">
          <h1 className="text-2xl portage-title">
            {" "}
            💸 A quel salaire pourrais je prétendre en portage salarial ?
          </h1>
          <p className="text-xl portage-paragraph">
            Les canaux de communication ne cessent d’évoluer. Vous pensez qu’il
            suffit de prendre les textes d’une brochure pour alimenter votre
            site internet par exemple… bien tenté, mais ça ne fonctionne pas
            comme cela ! La rédaction permet de toucher votre cible, de
            communiquer une information nécessaire sans trop d’artifices pour ne
            pas lasser le lecteur. Le style d’écriture doit s’adapter au
            support, qu’il s’agisse d’une story, de supports print ou web. La
            rédaction web nécessite des codes dans le but d’optimiser votre
            référencement, le littéraire doit alors laisser place à
            l’efficacité.
          </p>
        </div>
      </div>
    </main>
    </>
  );
};

export default Portage;
