import React from 'react'
import { CardWrapper } from './card-wrapper'

import { RiContractFill } from "react-icons/ri"
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6"
import { HiMiniUsers } from "react-icons/hi2"
import { FaHandHoldingMedical } from "react-icons/fa"
import { IoCheckmarkDoneOutline } from "react-icons/io5"



export const Card = () => {
    return (
        <div className='grid grid-cols-4 gap-6'>
            <CardWrapper
                title='Souscription'
                count={45} 
                differenceIconUp={<FaArrowUpLong size={10} />}
                differenceIconDown={<FaArrowDownLong size={10} />}
                differenceUp='34 de plus'
                differenceDown='... de moins'
                icon={<HiMiniUsers size={25} />}
                iconClassName='text-red-500 bg-red-500/10 p-2.5 rounded-lg'
                className='lg:cols-span-1'
            />
            <CardWrapper
                title='Contrat Actif'
                count={10} 
                differenceIconUp={<FaArrowUpLong size={10} />}
                differenceIconDown={<FaArrowDownLong size={10} />}
                differenceUp='34 de plus'
                differenceDown='... de moins'
                icon={<RiContractFill size={25} />}
                iconClassName='text-green-500 bg-green-500/10 p-2.5 rounded-lg'
                className='lg:cols-span-1'
            />
            <CardWrapper
                title='Sinistre'
                count={10} 
                differenceIconUp={<FaArrowUpLong size={10} />}
                differenceIconDown={<FaArrowDownLong size={10} />}
                differenceUp='34 de plus'
                differenceDown='... de moins'
                icon={<FaHandHoldingMedical size={25} />}
                iconClassName='text-blue-500 bg-blue-500/10 p-2.5 rounded-lg'
                className='lg:cols-span-1'
            />
            <CardWrapper
                title='Contrat Actif'
                count={10} 
                differenceIconUp={<FaArrowUpLong size={10} />}
                differenceIconDown={<FaArrowDownLong size={10} />}
                differenceUp='34 de plus'
                differenceDown='... de moins'
                icon={<IoCheckmarkDoneOutline size={25} />}
                iconClassName='text-purple-500 bg-purple-500/10 p-2.5 rounded-lg'
                className='lg:cols-span-1'
            />
        </div>
    )
}
