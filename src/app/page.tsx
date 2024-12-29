import Image from "next/image";
import "@/styles/Home.css";
import ValorCard from "@/components/home/ValorCard";
import DimensionCard from "@/components/home/DimensionCard";
import IntroSection from "@/components/home/IntroSection";
import Navbar from "@/components/navbar/NavBar";
import Button from "@/components/common/Button";
import MobileIntroSection from "@/components/common/MobileIntroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="Nous portons la passion "
          secondTitle="de nos métiers"
          undertitle="Glisse vers toutes les opportunités"
        />

        <div className="main-content px-10 2md:px-0">
          <MobileIntroSection
            firstTitle="Nous portons la passion de nos métiers"
            secondTitle="Glissez vers toutes les opportunités"
            client={true}
            freelance={true}
          />
          <div className="flex justify-between mt-20 2xl:flex-col 2md:mt-16">
            <div className="w-4/12 2xl:w-full">
              <h1 className="header-title-text font-bold 2xl:text-center sm:text-start">
                Pourquoi Connect et pas une autre ?
              </h1>
              <h5 className="mt-10 undertitle-text 2xl:text-center 2xl:mb-10 sm:font-semibold">
                Nos valeurs, c&apos;est ce qui nous différencie.
              </h5>
            </div>

            <div className="flex justify-around w-8/12 2xl:w-full 2md:grid grid-cols-2 2md:justify-items-center 2md:items-center sm:flex-col sm:flex">
              <ValorCard imageSrc="/passionPicto.svg" title="Passion">
                Nous nous investissons pleinement dans chaque projet en mettant
                du cœur à l’ouvrage.
              </ValorCard>
              <ValorCard
                imageSrc="/cooperationPicto.svg"
                title="Coopération"
                className="sm:mt-10"
              >
                L’esprit d’équipe et le partage nous importe. La richesse des
                contacts humains au centre de notre projet.
              </ValorCard>

              <div className="2md:flex 2md:items-center 2md:justify-center 2md:col-span-2 2md:mt-10">
                <ValorCard imageSrc="/sincerityPicto.svg" title="Sincérité">
                  Nous prônons la sincérité et l‘intégrité afin de composer
                  ensemble, une partition pérenne dans le temps.
                </ValorCard>
              </div>
            </div>
          </div>

          <div className="flex justify-between my-5 w-full mt-20 items-center 2md:mt-10">
            <div className="flex flex-col dimension-container w-7/12 2md:w-full">
              <h1 className="my-5 text-4xl text-bold header-title-text leading-relaxed 2md:text-center sm:text-start">
                Une dimension plus humaine
              </h1>
              <p className="my-2 undertitle-text mb-8 sm:font-medium">
                Des projets associatifs soutenus par une partie de nos
                bénéfices.
              </p>
              <p className="mb-4 undertitle-text sm:font-medium">
                En 2023, c&apos;est :
              </p>

              <div className="flex 2md:justify-center">
                <DimensionCard
                  background="linear-gradient(180deg, #79B3D1 0%, #B9D386 100%)"
                  title="20%"
                  undertitle="de nos bénéfices redistribués"
                  text=""
                />
                <DimensionCard
                  background="linear-gradient(180deg, #D892C0 0%, #79B3D1 100%)"
                  title="13"
                  undertitle="projets financés"
                  text=""
                />

                <DimensionCard
                  background="linear-gradient(180deg, #8EBA3A 0%, #B9D386 0.01%, #D892C0 79.69%)"
                  title="4"
                  undertitle="sportifs soutenus"
                  text=""
                />
              </div>
            </div>

            <div className="w-4/12 display-laptop">
              <img
                src="dimensionHumaine.svg"
                alt="Dimension connect"
                className="dimension-img ml-10"
              />
            </div>
          </div>

          <div className="justify-between my-28 w-full flex sm:mt-10">
            <div className="flex flex-col w-7/12 lg:w-8/12 2md:w-full">
              <h1 className="my-2 text-left text-4xl text-bold leading-relaxed header-title-text 2md:text-center mb-10 sm:text-start">
                Une application facile d’utilisation et ludique
              </h1>

              <div className="flex flex-col text-app-container">
                <p className="undertitle-text font-medium">
                  Disponible sur IOS et Android, l’application Connect connait
                  un réel succès grâce à son ergonomie.
                </p>
                <p className="mt-10 undertitle-text font-medium">
                  Inspirée d’une autre application très connue, tu trouveras le
                  job qui te convient en swipant à droite. Si ton profil
                  correspond à la mission, ça CONNECTE !
                </p>
              </div>

              <div className="flex mt-20 2md:justify-center">
                <img
                  src="googlePlay.svg"
                  alt="Google Play"
                  className="mr-10 play-store-img"
                />
                <img
                  className="mx-10 play-store-img"
                  src="iosStore.svg"
                  alt="IOS Store"
                />
              </div>
            </div>

            <Image
              src="iPhone.svg"
              alt="Application Connect"
              className="mt-20 display-laptop"
              width={300}
              height={100}
            />
          </div>
        </div>
      </main>
    </>
  );
}
