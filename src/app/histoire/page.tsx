import IntroSection from "@/components/home/IntroSection";
import React from "react";
import "@/styles/Portage.css";
import Navbar from "@/components/navbar/NavBar";
import MobileIntroSection from "@/components/common/MobileIntroSection";

const HistoirePage = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="Ne cherche plus, il y a"
          secondTitle=" CONNECT, nous faisons le reste"
          undertitle="Il était une fois... notre histoire"
        />
        <MobileIntroSection
          firstTitle="Ne te cherche plus, il y a CONNECT et on s’occupe du reste"
          secondTitle="Il était une fois ... Notre histoire"
          client={true}
          freelance={true}
        />
        <div className="main-content">
          <h1 className="header-title-text my-20 text-semibold px-10 sm:my-10">
            Il était une fois... notre histoire
          </h1>

          <div className="px-10 sm:px-0">
            <p className="undertitle-text text-light leading-relaxed">
              Toujours en quête de nouvelles aventures et dans un soucis
              d&apos;accompagnement encore plus poussée nous avons crée
              CONNECTcellence.
            </p>

            <p className="undertitle-text text-light leading-relaxed mt-10">
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
