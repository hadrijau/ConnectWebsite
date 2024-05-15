import Image from "next/image";
import "@/styles/Home.css";
import ValorCard from "@/components/home/ValorCard";
import DimensionCard from "@/components/home/DimensionCard";
import IntroSection from "@/components/home/IntroSection";
import Navbar from "@/components/navbar/NavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between mt-32">
        <IntroSection
          firstTitle="Nous portons la passion "
          secondTitle="de nos métiers"
          undertitle="Glisse vers toutes les opportunités"
          image="/sectionHome.svg"
          background="linear-gradient(135deg, #79B3D1 0%, #D892C0 100%)"
        />

        <div className="main-content">
          <div className="flex justify-between mt-20 lg:flex-col">
            <div className="w-4/12 lg:w-full">
              <h1 className="text-4xl font-bold leading-relaxed lg:text-4xl lg:text-center">
                Pourquoi Connect et pas une autre ?
              </h1>
              <h5 className="mt-10 text-2xl lg:text-xl lg:text-center lg:mb-10">
                Nos valeurs, c&apos;est ce qui nous différencie.
              </h5>
            </div>

            <div className="flex justify-around w-8/12 lg:w-full">
              <ValorCard imageSrc="/passionPicto.svg" title="Passion">
                Nous nous investissons pleinement dans chaque projet en mettant
                du cœur à l’ouvrage.
              </ValorCard>
              <ValorCard imageSrc="/cooperationPicto.svg" title="Coopération">
                L’esprit d’équipe et le partage nous importe. La richesse des
                contacts humains au centre de notre projet.
              </ValorCard>
              <ValorCard imageSrc="/sincerityPicto.svg" title="Sincérité">
                Nous prônons la sincérité et l‘intégrité afin de composer
                ensemble, une partition pérenne dans le temps.
              </ValorCard>
            </div>
          </div>

          <div className="flex justify-between my-5 w-full mt-20 items-center">
            <div className="flex flex-col dimension-container w-7/12">
              <h1 className="my-5 text-4xl text-bold leading-relaxed lg:text-4xl">
                Une dimension plus humaine
              </h1>
              <p className="my-2 text-2xl mb-8 lg:text-xl">
                Des projets associatifs soutenus par une partie de nos
                bénéfices.
              </p>
              <p className="mb-4 text-2xl lg:text-xl">En 2023, c&apos;est :</p>

              <div className="flex">
                <DimensionCard
                  background="linear-gradient(180deg, #79B3D1 0%, #B9D386 100%)"
                  title="20%"
                  undertitle="de nos bénéfices redistribués"
                  text=""
                />
                <DimensionCard
                  background="linear-gradient(180deg, #D892C0 0%, #79B3D1 100%)"
                  title="13"
                  undertitle="projets"
                  text="financés"
                />
                <DimensionCard
                  background="linear-gradient(180deg, #8EBA3A 0%, #B9D386 0.01%, #D892C0 79.69%)"
                  title="4"
                  undertitle="sportifs"
                  text="soutenus"
                />
              </div>
            </div>

            <div className="w-4/12">
              <img
                src="dimensionHumaine.svg"
                alt="Dimension connect"
                className="dimension-img ml-10"
              />
            </div>
          </div>

          <div className="justify-between my-10 w-full flex">
            <div className="flex flex-col w-7/12 lg:w-8/12">
              <h1 className="my-2 text-left text-4xl text-bold leading-relaxed lg:text-4xl">
                Une application facile d’utilisation et ludique
              </h1>

              <div className="flex flex-col text-app-container">
                <p className="text-2xl lg:text-xl">
                  Disponible sur IOS et Android, l’application Connect connait
                  un réel succès grâce à son ergonomie.
                </p>
                <p className="mt-10 text-2xl lg:text-xl">
                  Inspirée d’une autre application très connue, tu trouveras le
                  job qui te convient en swipant à droite. Si ton profil
                  correspond à la mission, ça CONNECTE !
                </p>
              </div>

              <div className="flex mt-20">
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
              className="mt-20"
              width={300}
              height={100}
            />
          </div>
        </div>
      </main>
    </>
  );
}
