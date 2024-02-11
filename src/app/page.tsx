import Image from "next/image";
import "@/styles/Home.css";
import Button from "@/components/common/Button";
import ValorCard from "@/components/home/ValorCard";
import DimensionCard from "@/components/home/DimensionCard";
import "@/styles/Home.css";
import IntroSection from "@/components/home/IntroSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <IntroSection
        firstTitle="Nous portons la"
        secondTitle="passion de nos"
        thirdTitle="métiers"
        undertitle="Glissez vers toutes les opportunités"
        image="/sectionHome.svg"
        background="linear-gradient(135deg, #79B3D1 0%, #D892C0 100%)"
      />

      <div className="flex px-20 justify-between mt-20">
        <div className="header-valor">
          <h1 className="header-home">Pourquoi Connect et pas une autre ?</h1>
          <h5 className="mt-10 text-2xl">
            Nos valeurs, c&apos;est ce qui nous différencie.
          </h5>
        </div>

        <div className="flex justify-around">
          <ValorCard imageSrc="/passionPicto.svg" title="Passion">
            Nous nous investissons pleinement dans chaque projet en mettant du
            cœur à l’ouvrage.
          </ValorCard>
          <ValorCard imageSrc="/cooperationPicto.svg" title="Coopération">
            L’esprit d’équipe et le partage nous importe. La richesse des
            contacts humains au centre de notre projet.
          </ValorCard>
          <ValorCard imageSrc="/sincerityPicto.svg" title="Sincérité">
            Nous prônons la sincérité et l‘intégrité afin de composer ensemble,
            une partition pérenne dans le temps.
          </ValorCard>
        </div>
      </div>

      <div className="flex px-20 justify-between my-5 w-full">
        <div className="flex flex-col dimension-container mt-40">
          <h1 className="header-home my-2">Une dimension plus humaine</h1>
          <p className="my-2 text-2xl mb-8">
            Des projets associatifs soutenus par une partie de nos bénéfices.
          </p>
          <p className="mb-4 text-2xl">En 2023, c&apos;est :</p>

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

        <div>
          <Image
            src="association.svg"
            alt="Dimension connect"
            width={700}
            height={700}
          />
        </div>
      </div>

      <div className="px-20 justify-between my-10 w-full flex">
        <div className="flex flex-col">
          <h1 className="header-home my-2 text-left">
            Une application facile d’utilisation et ludique
          </h1>

          <div className="flex flex-col text-app-container">
            <p className="text-2xl">
              Disponible sur IOS et Android, l’application Connect connait un
              réel succès grâce à son ergonomie.
            </p>
            <p className="mt-20 text-2xl">
              Inspirée d’une autre application très connue, tu trouveras le job
              qui te convient en swipant à droite. Si ton profil correspond à la
              mission, ça CONNECTE !
            </p>
          </div>

          <div className="flex mt-20">
            <Image
              src="googlePlay.svg"
              alt="Google Play"
              className="mr-10"
              width={245}
              height={66}
            />
            <Image
              className="mx-10"
              src="iosStore.svg"
              alt="IOS Store"
              width={260}
              height={70}
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
    </main>
  );
}
