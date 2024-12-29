import Image from "next/image";
import "@/styles/Home.css";
import "@/styles/Independant.css";

import IntroSection from "@/components/home/IntroSection";
import LongButton from "@/components/common/LongButton";
import Navbar from "@/components/navbar/NavBar";
import MobileIntroSection from "@/components/common/MobileIntroSection";
import Link from "next/link";

export default function IndependantPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-between mt-32">
        <div className="main-indep">
          <IntroSection
            firstTitle="Connect, société de"
            secondTitle="portage pour les indépendants"
            undertitle="Glisse vers toutes les opportunités"
          />
        </div>

        <div className="main-content">
          <MobileIntroSection
            firstTitle="Connect, société de portage pour les indépendants"
            secondTitle="Glissez vers toutes les opportunités"
            client={true}
            freelance={false}
          />
        </div>

        <div className="relative w-[800px] h-[800px] xl:mx-20 2lg:w-[600px] 2lg:h-[600px] md:w-[400px] md:h-[400px] sm:mt-0 2xs:w-[300px] 2xs:h-[300px]">
          <Image
            src="/independantFrame.svg"
            alt="Connect independant"
            layout="fill"
          />
        </div>

        <div className="display-computer">
          <LongButton
            href="/portage"
            textClassName="text-sm"
            className="font-bold text-xs mt-6 py-5 px-8 mb-10"
            title="Découvre la société de portage"
            background="linear-gradient(180deg, #B9D386 0%, #79B3D1 100%)"
          />
        </div>

        <div
          className="display-mobile flex justify-center items-center rounded-lg text-center undertitle-text text-normal py-3 my-10 w-96 sm:my-0 2xs:w-80"
          style={{
            background: "linear-gradient(180deg, #B9D386 0%, #79B3D1 100%)",
          }}
        >
          <Link href="/portage">Découvre la société de portage</Link>
        </div>

        <h1 className="header-title-text text-center text-bold my-20 sm:my-10">
          Tes avantages en tant que salarié porté
        </h1>
        <div className="avantages-section w-full flex justify-center">
          <div className="main-indep flex justify-between sm:items-center">
            <div className="w-6/12 mt-40 sm:mt-0">
              <h2 className="header-title-text font-bold mb-14 leading-relaxed display-computer ">
                Profite des avantages d&apos;
                <span style={{ color: "#8EBA3A" }}>
                  un <br />
                  salarié
                </span>
              </h2>
              <h2 className="header-title-text font-bold leading-relaxed display-mobile mb-4">
                Profite des avantages d&apos;
                <span style={{ color: "#8EBA3A" }}>un salarié</span>
              </h2>
              <p className="undertitle-text leading-relaxed">
                En faisant partie de CONNECT, vous êtes totalement indépendant,
                mais vous
                <span style={{ color: "#8EBA3A" }}>
                  bénéficiez des avantages salarial
                </span>
                . Carte ticket restaurant, chômage, retraite, un salaire versé
                chaque mois, fiche de paie, mutuelle ...
              </p>
            </div>
            <div className="photo-container">
              <Image
                src="/salarie1.svg"
                alt="salarié"
                width={500}
                height={250}
              />
            </div>
          </div>
        </div>

        <div className="gestion-section py-20 flex justify-center w-full sm:py-14">
          <div className="main-indep flex justify-between flex-row-reverse">
            <div className="w-6/12 mt-40 sm:mt-0">
              <h2 className="header-title-text font-bold mb-14 mr leading-relaxed display-computer">
                Délégue ta
                <span style={{ color: "#3A8EBA" }} className="ml-2">
                  gestion <br />
                  administrative
                </span>
              </h2>
              <h2 className="header-title-text font-bold mb-4 mr leading-relaxed display-mobile">
                Délégue ta
                <span style={{ color: "#3A8EBA" }} className="ml-2">
                  gestion administrative
                </span>
              </h2>
              <p className="undertitle-text leading-relaxed">
                Avec <span style={{ fontWeight: "italic" }}>CONNECT</span> , il
                vous suffit juste d’exécuter votre mission. Nous nous occupons
                du reste.
                <br /> Plus besoin de mettre la tête dans les papiers, la
                <span style={{ color: "#3A8EBA" }} className="mx-1">
                  gestion de votre activité est notre mission.
                </span>
                Factures, notes de frais, fiche de paie...
              </p>
            </div>
            <div className="photo-container">
              <Image
                src="/administration.svg"
                alt="salarié"
                width={500}
                height={250}
              />
            </div>
          </div>
        </div>

        <div className="opportunity-section w-full flex justify-center">
          <div className="main-indep flex justify-between mb-10 py-10 sm:py-0">
            <div className="w-6/12 mt-20 sm:mt-0">
              <h2 className="header-title-text font-bold mb-14 mr leading-relaxed sm:mb-4">
                Glisse vers toutes les
                <span style={{ color: "#3A8EBA" }} className="ml-2">
                  opportunités
                </span>
              </h2>
              <p className="undertitle-text leading-relaxed">
                Avec CONNECT, il vous suffit d’ajouter votre profil sur
                l’application. Vous recherchez plutôt une mission longue ?
                Courte ?
                <br />
                Ne perdez plus de temps, vous pouvez trouver du travail en vous
                amusant sur votre smartphone
                <span style={{ color: "#3A8EBA" }} className="mx-1 font-bold">
                  BOOM CA CONNECTE !
                </span>
                <br />
                <span className="font-bold">Disponible prochainement</span>
              </p>
            </div>
            <div className="photo-container">
              <Image
                src="/mobileApp.svg"
                alt="Application mobile connect"
                width={300}
                height={100}
                className="mr-40 mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
