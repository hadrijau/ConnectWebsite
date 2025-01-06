import React from "react";
import Image from "next/image";

interface MissionDropdownProps {
  openMission: boolean;
  handleOpenMission: () => void;
  path: string;
  router: any;
}

const MissionDropdown: React.FC<MissionDropdownProps> = ({
  openMission,
  handleOpenMission,
  path,
  router,
}) => {
  return (
    <div className="flex mt-5 relative">
      <h5
        className={
          path.startsWith("/freelance/ao")
            ? "cursor-pointer link-active-freelance text-xl text-normal xl:text-base 2lg:text-sm"
            : "cursor-pointer nav-link-freelance text-xl text-normal xl:text-base 2lg:text-sm"
        }
        onClick={handleOpenMission}
      >
        Mes missions
      </h5>

      <Image
        src="/arrow_down_black.svg"
        width={10}
        height={10}
        alt="Appel d'offres"
        className="cursor-pointer"
        onClick={handleOpenMission}
      />

      {openMission && (
        <div className="flex flex-col select-ao p-3">
          <div
            className="flex cursor-pointer ao-option p-2"
            onClick={() => router.push("/freelance/missions/ongoing")}
          >
            Mes missions en cours
          </div>
          <div
            className="flex cursor-pointer ao-option p-2"
            onClick={() => router.push("/freelance/missions/past")}
          >
            Mes missions passées
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionDropdown;
