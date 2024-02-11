import Image from "next/image";
import "@/styles/Home.css";
import Button from "@/components/common/Button";
import ValorCard from "@/components/home/ValorCard";
import DimensionCard from "@/components/home/DimensionCard";
import "@/styles/Independant.css";

import IntroSection from "@/components/home/IntroSection";
import LongButton from "@/components/common/LongButton";

export default function IndependantPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <IntroSection
        firstTitle="Connect, société de"
        secondTitle="portage pour les"
        thirdTitle="indépendants"
        undertitle="Glissez vers toutes les opportunités"
        image="/sectionIndependant.svg"
        background="linear-gradient(135deg, #79B3D1 0%, #B9D386 100%)"
      />
      <Image
        src="/independantFrame.svg"
        alt="Connect independant"
        width={1000}
        height={1000}
        className="mt-20"
      />
      <div>
        <LongButton
          href="/"
          textClassName="text-sm"
          className="font-bold text-xs mt-6 py-5 px-8 mb-10"
          title="Découvre la société de portage"
          background="linear-gradient(180deg, #B9D386 0%, #79B3D1 100%)"
        />
      </div>

      <h1 className="text-5xl text-center text-bold my-20">
        Vos avantages en tant que salarié porté
      </h1>
      <div className="flex justify-between px-20 avantages-section">
        <div className="w-6/12 mt-40">
          <h2 className="text-3xl font-bold mb-14 leading-relaxed">
            Profitez des avantages d'
            <span style={{ color: "#8EBA3A" }}>
              un <br />
              salarié
            </span>
          </h2>
          <p className="text-xl leading-relaxed">
            En faisant partie de CONNECT, vous êtes totalement indépendant, mais
            vous{" "}
            <span style={{ color: "#8EBA3A" }}>
              bénéficiez des avantages salarial
            </span>
            . Carte ticket restaurant, chômage, retraite, un salaire versé
            chaque mois, fiche de paie, mutuelle ...
          </p>
        </div>
        <div>
          <Image src="/salarie1.svg" alt="salarié" width={500} height={250} />
        </div>
      </div>

      <div className="flex justify-between px-20 flex-row-reverse gestion-section py-20">
        <div className="w-6/12 mt-40">
          <h2 className="text-3xl font-bold mb-14 mr leading-relaxed">
            Déléguez votre
            <span style={{ color: "#3A8EBA" }} className="ml-1">
              gestion <br />
              administrative
            </span>
          </h2>
          <p className="text-xl leading-relaxed">
            Avec <span style={{ fontWeight: "italic" }}>CONNECT</span> , il vous
            suffit juste d’exécuter votre mission. Nous nous occupons du reste.{" "}
            <br /> Plus besoin de mettre la tête dans les papiers, la
            <span style={{ color: "#3A8EBA" }} className="mx-1">
              gestion de votre activité est notre mission.
            </span>
            Factures, notes de frais, fiche de paie...
          </p>
        </div>
        <div>
          <Image
            src="/administration.svg"
            alt="salarié"
            width={500}
            height={250}
          />
        </div>
      </div>

      <div className="flex justify-between px-20 opportunity-section mb-10 w-full py-10">
        <div className="w-6/12 mt-20">
          <h2 className="text-3xl font-bold mb-14 mr leading-relaxed">
            Glissez vers toutes les
            <span style={{ color: "#3A8EBA" }} className="ml-1">
              opportunités
            </span>
          </h2>
          <p className="text-xl leading-relaxed">
            Avec CONNECT, il vous suffit d’ajouter votre profil sur
            l’application. Vous recherchez plutôt une mission longue ? Courte ?{" "}
            <br />
            Ne perdez plus de temps, vous pouvez trouver du travail en vous
            amusant sur votre smartphone.{" "}
            <span style={{ color: "#3A8EBA" }} className="mx-1 font-bold">
              BOOM CA CONNECTE !
            </span>{" "}
            <br />
            <span className="font-bold">Disponible prochainement</span>
          </p>
        </div>
        <div>
          <Image
            src="/mobileApp.svg"
            alt="Application mobile connect"
            width={300}
            height={100}
            className="mr-40 mt-5"
          />
        </div>
      </div>
    </main>
  );
}
