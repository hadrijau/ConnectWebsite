import Image from "next/image";
import "@/styles/Home.css";
import "@/styles/Entreprise.css";

import IntroSection from "@/components/home/IntroSection";
import Navbar from "@/components/navbar/NavBar";

export default function EnterprisePage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-between mt-24">
        <IntroSection
          firstTitle="CONNECT, société de portage"
          secondTitle=" pour les entreprises"
          undertitle="Glisse vers toutes les opportunités"
          image="/sectionEnterprise.svg"
          background="linear-gradient(135deg, #D892C0 0%, #B9D386 100%)"
          buttonBackground="#D892C0"
        />

        <h1 className="text-5xl text-center text-bold my-20">
          Tes avantages en tant que entreprise cliente
        </h1>
        <div className="demarche-section w-full flex justify-center">
          <div className="main-content flex justify-between flex-row-reverse">
            <div className="w-6/12 mt-20">
              <h2 className="text-3xl font-bold mb-10 leading-relaxed">
                Une démarche
                <span style={{ color: "#8EBA3A" }} className="ml-2">
                  simplfiée et sans surprise
                </span>
              </h2>
              <p className="text-xl leading-relaxed">
                La démarche liée aux obligations sociales et fiscales est à
                notre charge. <br />
                <span style={{ color: "#9ABF7A" }} className="mr-2">
                  Pas de surprises:
                </span>
                vous négociez vous-même le tarif de la prestation et vous
                établissez les termes du contrat avec l’indépendant.
              </p>
            </div>
            <div>
              <Image src="/zen.svg" alt="salarié" width={400} height={250} />
            </div>
          </div>
        </div>

        <div className="partenaire-section py-5 w-full flex justify-center">
          <div className="main-content flex justify-between flex-row-reverse">
            <div className="w-6/12 mt-20">
              <h2 className="text-3xl font-bold mb-10 mr leading-relaxed">
                Devenez
                <span style={{ color: "#BA3A8E" }} className="ml-2">
                  nos partenaires
                </span>{" "}
                de travail
              </h2>
              <p className="text-xl leading-relaxed">
                Nous ne sommes pas simplement un lien entre vous et le salarié
                porté, mais nous
                <span style={{ color: "#BA3A8E" }} className="mx-1">
                  deviendrons de vrais partenaires.
                </span>
                Main dans la main, nous vous accompagnons sur la mise en place
                de CONNECT au sein de votre entreprise.
              </p>
            </div>
            <div>
              <Image
                src="/partner.svg"
                alt="salarié"
                width={500}
                height={250}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mission-section mb-10">
          <div className="main-content flex justify-between">
            <div className="w-6/12 mt-10">
              <h2 className="text-3xl font-bold mb-14 mr leading-relaxed">
                Démarrez
                <span style={{ color: "#BA3A8E" }} className="mx-2">
                  rapidement
                </span>{" "}
                les missions
              </h2>
              <p className="text-xl leading-relaxed">
                Nous vous accompagnons dans la partie contractuelle et nous
                mettons en place la mission en très peu de temps. Le contrat est
                signé,
                <span style={{ color: "#BA3A8E" }} className="mx-1 font-bold">
                  nous nous occupons du reste.
                </span>
              </p>
            </div>
            <div>
              <Image
                src="/fusee.svg"
                alt="Application mobile connect"
                width={500}
                height={100}
                className="mr-40 fusee-img"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10 w-full py-10">
          <div className="main-content flex justify-between">
            <div className="w-6/12 mt-20">
              <h2 className="text-3xl font-bold mb-14 mr leading-relaxed">
                Diffusez vos offres de missions avec simplicité
              </h2>
              <p className="text-xl leading-relaxed">
                Avec CONNECT, il vous suffit de mettre votre annonce sur
                l’application. C’est après à nous de jouer. <br />
                Nous vous cherchons un profil qui connecte avec la mission
                demander.
                <span className="mx-1 font-bold">BOOM CA CONNECTE !</span>{" "}
                <br />
                Trouvez le profil idéal directement via votre smartphone.
              </p>
            </div>
            <div>
              <Image
                src="/appli.svg"
                alt="Application mobile connect"
                width={300}
                height={100}
                className="mr-40 mt-5"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
