import React from "react";
import Image from "next/image";

interface OfficialDocumentsMobileProps {
  openOfficialDocuments: boolean;
  handleOpenOfficialDocuments: () => void;
  router: any;
  userType: string;
}

const OfficialDocumentsMobile: React.FC<OfficialDocumentsMobileProps> = ({
  openOfficialDocuments,
  handleOpenOfficialDocuments,
  router,
  userType,
}) => {
  return (
    <div className="flex mt-5 flex-col">
      <div className="flex">
        <h5
          onClick={handleOpenOfficialDocuments}
          className="text-base text-normal"
        >
          Mes documents officiels
        </h5>

        <Image
          src="/arrow_down_black.svg"
          width={10}
          height={10}
          alt="Appel d'offres"
          className="cursor-pointer ml-5"
          onClick={handleOpenOfficialDocuments}
        />
      </div>

      {openOfficialDocuments && (
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer ao-option mt-2 text-normal text-sm"
            onClick={() =>
              userType === "client"
                ? router.push("/client/documents")
                : router.push("/freelance/documents")
            }
          >
            KBIS
          </div>
          <div
            className="flex cursor-pointer ao-option mt-2 text-normal text-sm"
            onClick={() =>
              userType === "client"
                ? router.push("/client/documents")
                : router.push("/freelance/documents")
            }
          >
            Contrat
          </div>
          <div
            className="flex cursor-pointer ao-option mt-2 text-normal text-sm"
            onClick={() =>
              userType === "client"
                ? router.push("/client/documents")
                : router.push("/freelance/documents")
            }
          >
            Attestation de vigilance
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficialDocumentsMobile;
