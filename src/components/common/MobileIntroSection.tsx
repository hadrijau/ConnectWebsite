import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MobileIntroSectionProps {
  firstTitle: string;
  secondTitle: string;
  client: boolean;
  freelance: boolean;
}

const MobileIntroSection: React.FC<MobileIntroSectionProps> = ({
  firstTitle,
  secondTitle,
  client,
  freelance,
}) => {
  return (
    <div className="display-mobile">
      <h1 className="header-title-text font-semibold mt-8">{firstTitle}</h1>
      <h5 className="undertitle-text my-4 text-normal">{secondTitle}</h5>
      <div className="flex flex-col">
        {freelance && client && (
          <>
            <div className="bg-client flex justify-center items-center rounded-lg undertitle-text text-normal py-3">
              <Link href="/entreprise">Entreprise</Link>
            </div>
            <div className="flex justify-center items-center rounded-lg undertitle-text text-normal py-3 border-green mt-4">
              <Link href="/independant">Indépendant</Link>
            </div>
          </>
        )}
        {client && !freelance && (
          <>
            <div className="bg-client flex justify-center items-center rounded-lg undertitle-text text-normal py-3">
              <Link href="/entreprise">Entreprise</Link>
            </div>
          </>
        )}
        {freelance && !client && (
          <div className="bg-freelance flex justify-center items-center rounded-lg undertitle-text text-normal py-3 mt-4">
            <Link href="/independant">Indépendant</Link>
          </div>
        )}
        {!(freelance && client) && (
          <div className="flex justify-center items-center mt-2">
            <div className="w-40 h-20 relative mr-2">
              <Image src="googlePlay.svg" alt="Google Play" layout="fill" />
            </div>
            <div className="w-40 h-20 relative ml-2">
              <Image src="iosStore.svg" alt="IOS Store" layout="fill" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileIntroSection;
