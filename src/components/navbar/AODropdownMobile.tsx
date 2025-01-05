import React from "react";
import Image from "next/image";

interface AODropdownMobileProps {
  openAO: boolean;
  handleOpenAO: () => void;
  router: any;
}

const AODropdownMobile: React.FC<AODropdownMobileProps> = ({
  openAO,
  handleOpenAO,
  router,
}) => {
  return (
    <div className="flex mt-5 flex-col">
      <div className="flex">
        <h5 onClick={handleOpenAO} className="text-base text-normal">AO</h5>
        <Image
          src="/arrow_down_black.svg"
          width={10}
          height={10}
          alt="Appel d'offres"
          className="cursor-pointer ml-5"
          onClick={handleOpenAO}
        />
      </div>

      {openAO && (
        <div className="flex flex-col">
          <div className="flex cursor-pointer ao-option p-2">
            <Image
              src="/freelanceMissionSpaceship.svg"
              width={40}
              height={40}
              alt="Recherche appel d'offre"
              className="mr-2"
            />
            <div
              className="flex flex-col"
              onClick={() => router.push("/freelance/ao/recherche")}
            >
              <h5>Recherche un appel d&apos;offre</h5>
              <p className="text-xs undertitle-select">Je veux me connecter</p>
            </div>
          </div>
          <div
            className="flex cursor-pointer ao-option p-2"
            onClick={() => router.push("/freelance/ao/cheris")}
          >
            <Image
              src="/AO_cheris.svg"
              width={40}
              height={40}
              alt="AO chéris"
              className="mr-2"
            />
            <div className="flex flex-col">
              <h5>AO chéris</h5>
              <p className="text-xs undertitle-select">
                Intéressant ! Je dois encore réfléchir
              </p>
            </div>
          </div>

          <div
            className="flex flex-col ao-option p-2 cursor-pointer"
            onClick={() => router.push("/freelance/ao/propositions")}
          >
            <h5>Propositions</h5>
            <p className="text-xs undertitle-select">Ai-je été choisi ?</p>
          </div>
          <div
            className="flex flex-col ao-option p-2 cursor-pointer"
            onClick={() => router.push("/freelance/ao/prolongements")}
          >
            <h5>Prolongements</h5>
            <p className="text-xs undertitle-select">Et zé partiiiiii !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AODropdownMobile;
