import "@/styles/Freelance.css";
import FreelanceNavBar from "@/components/navbar/FreelanceNavbar";
import FreelanceIntroSection from "@/components/common/FreelanceIntroSection";
import Mission from "@/entities/mission";
import { auth } from "@/auth";
import CardMission from "@/components/freelance/CardMission";
import { redirect } from "next/navigation";
import Image from "next/image";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import { getAllMissionsByFreelanceId, getFreelanceById } from "@/http/freelance";

export default async function AOCherisPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const freelance = await getFreelanceById(session.user.id);
  const { likedMissions } =
  await getAllMissionsByFreelanceId(session.user.id);

  return (
    <>
      <FreelanceNavBar />
      <main className="flex flex-col items-center justify-between mt-32">
        <FreelanceIntroSection
          firstTitle="Recherche AO"
          undertitle="je veux me connecter"
        />

        <div className="flex justify-between w-full main-content flex-col">
          <FreelanceAoNavbar />
          <div className="flex justify-between w-full mt-10">
            <div className="flex-col w-7/12 lg:w-8/12">
              {likedMissions.map((mission: Mission, index: number) => {
                const { propositions } = mission;
                let propositionsLength = 0;
                if (propositions && propositions.length != 0) {
                  propositionsLength = propositionsLength;
                }
                return <CardMission key={index} mission={mission} freelance={freelance}/>;
              })}
            </div>

            <div className="flex flex-col ongoing-mission-container-freelance p-10 rounded-3xl w-1/5 items-center">
              <h3 className="text-2xl text-semibold mb-6">CONNECT</h3>
              <h5 className="text-center text-normal text-base">
                t’accompagne dans ta recherche d’appel d’offres. Tu trouveras
                ici tout ce que tu es venu chercher.
                <br />
                <br />
                Pour toutes questions et demandes d’informations, tu peux nous
                contacter !
              </h5>
              <button
                className="bg-freelance py-5 px-4 text-white rounded my-20"
                style={{ backgroundColor: "rgba(185, 211, 134, 1)" }}
              >
                Envie de discuter ?
              </button>
              <Image
                src="/ao_follow.svg"
                width={300}
                height={70}
                alt="Missions en cours"
                className="mb-5"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
