import React from "react";
import Image from "next/image";

interface MissionDropdownMobileProps {
  openMission: boolean;
  handleOpenMission: () => void;
  router: any;
}

const MissionDropdownMobile: React.FC<MissionDropdownMobileProps> = ({
  openMission,
  handleOpenMission,
  router,
}) => {
  return (
    <div className="flex mt-5 flex-col">
      <div className="flex">
        <h5 onClick={handleOpenMission} className="text-base text-normal">
          Mes missions
        </h5>

        <Image
          src="/arrow_down_black.svg"
          width={10}
          height={10}
          alt="Appel d'offres"
          className="cursor-pointer ml-5"
          onClick={handleOpenMission}
        />
      </div>

      {openMission && (
        <div className="flex flex-col">
          <div className="flex cursor-pointer ao-option mt-2 text-normal text-sm">
            Mes missions en cours
          </div>
          <div
            className="flex cursor-pointer ao-option mt-2 text-normal text-sm"
            onClick={() => router.push("/freelance/ao/cheris")}
          >
            Mes missions passées
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionDropdownMobile;
