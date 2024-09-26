import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstant'

const GptSearchBar = () => {

  const langKey=useSelector(store => store.config.lang);
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className=' w-1/2 bg-black grid grid-cols-12 rounded-lg'>
            <input className='p-4 m-4 col-span-9 rounded-md' type="text" placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className="py-2 px-4 m-4 col-span-3 bg-red-700 rounded-md text-white">
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar