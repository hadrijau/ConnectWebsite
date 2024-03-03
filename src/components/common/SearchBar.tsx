import React from 'react'
import Image from 'next/image';
import "@/styles/components/SearchBar.css";

const SearchBar = () => {
  return (
    <div className='flex search-container rounded-3xl py-3 w-9/12'>
        <Image src="/search.svg" width={30} height={30} alt="Recherche" className='mx-3'/>
        <input type="text" placeholder="Ecriture, UX Design, Communication, Pack Office ..." className='w-full bg-inherit border-none outline-none'/>

    </div>
  )
}

export default SearchBar