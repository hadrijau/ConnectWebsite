import React, { FC } from 'react';

interface CardOnGoingMissionProps {
  title: string;
  company: string;
  date: string;
}

const CardOnGoingMission: FC<CardOnGoingMissionProps> = ({ title, company, date }) => {
  return (
    <div className='flex flex-col bg-white rounded-3xl p-4 my-5 w-full'>
      <p className='text-2xs'>{date}</p>
      <h2 className="text-normal text-center ">
        {title}
      </h2>
      <h5 className='text-center text-sm'>{company}</h5>
    </div>
  );
};

export default CardOnGoingMission;
