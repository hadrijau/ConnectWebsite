import Link from 'next/link'
import React from 'react'

interface WelcomeCardProps {
    href: string;
    image: string;
    title: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({href, image, title}) => {
  return (
    <Link href={href}>
        <div className="flex-col bg-white rounded-2xl h-80 p-5">
            <img src={image} alt="Bienvenue chez Connect" style={{width: 250, height: 250}}/>
            <p className='text-normal text-center mt-3'>{title}</p>
        </div>
    </Link>
  )
}

export default WelcomeCard