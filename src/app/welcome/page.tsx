import React from "react";
import WelcomeCard from "@/components/welcome/WelcomeCard";
import "@/styles/Welcome.css";

const WelcomePage = () => {
  const welcomeData = [
    {
      href: "",
      title: "Mon profil",
      image: "welcome1.svg",
    },
    {
      href: "",
      title: "Mes compétences",
      image: "welcome2.svg",
    },
    {
      href: "",
      title: "Mes expériences",
      image: "welcome3.svg",
    },
    {
      href: "",
      title: "Mon entreprise",
      image: "welcome4.svg",
    },
  ];

  return (
    <div className="welcome-container py-20 px-40">
      <h1 className="text-white text-center text-5xl font-bold mb-20">Bienvenue à toi... </h1>
      <h5 className="text-center text-white text-2xl mb-40">
        Afin de pouvoir continuer, nous aimerions te connaître davantage.
        Quelles sont tes <br /> compétences ? Tes expériences ?...{" "}
      </h5>
      <div className="flex justify-between mt-20">
        {welcomeData.map((data, index) => {
          const { href, title, image } = data;
          return (
            <WelcomeCard href={href} title={title} image={image} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default WelcomePage;
