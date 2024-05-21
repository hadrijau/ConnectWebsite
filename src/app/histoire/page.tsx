import IntroSection from "@/components/home/IntroSection";
import React from "react";
import "@/styles/Portage.css";
import Navbar from "@/components/navbar/NavBar";

const HistoirePage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="Ne cherche plus, il y a"
          secondTitle=" CONNECT, nous faisons le reste"
          undertitle="Il était une fois... notre histoire"
          image="/sectionHistoire.svg"
          background="linear-gradient(135deg, #79B3D1 0%, #D892C0 100%)"
        />
        <div className="main-content">
          <h1 className="text-4xl mb-20 text-semibold mt-20 px-10 2lg:text-3xl">
            Il était une fois... notre histoire
          </h1>

          <div className="px-10">
            <p className="text-2xl text-light leading-relaxed 2lg:text-xl">
              Toujours en quête de nouvelles aventures et dans un soucis
              d&apos;accompagnement encore plus poussée nous avons crée
              CONNECTcellence.
            </p>

            <p className="text-2xl text-light leading-relaxed mt-10 2lg:text-xl">
              Le consulting, <span className="text-bold">ça nous connait </span>{" "}
              ! Déjà propriétaire d’une société de conseil depuis bientôt 5 ans,
              nous voulions faire plaisir aussi aux indépendants ! Chez nous, il
              y a de la place pour tout le monde.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default HistoirePage;
