"use client"
import React from "react";
import FreelanceAoNavbar from "@/components/freelance/FreelanceAoNavbar";
import PropositionsNavBar from "@/components/freelance/PropositionsNavBar";
import CardMission from "@/components/freelance/CardMission";

const AODisplay = ({missions}) => {
  return (
    <div>
      <FreelanceAoNavbar />
      <div className="flex justify-center">
        <PropositionsNavBar />
      </div>
      <div className="flex justify-between w-full mt-10">
        <div className="flex-col w-7/12 lg:w-8/12">
          {missions.map((mission, index) => {
            const { _id, title, price, propositions, date, length } = mission;
            return (
              <CardMission
                key={index}
                _id={_id}
                title={title}
                propositions={propositions}
                date={date}
                companyLogo={"/logoSoge.svg"}
                companyName={"Company B"}
                price={price}
                length={length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AODisplay;
