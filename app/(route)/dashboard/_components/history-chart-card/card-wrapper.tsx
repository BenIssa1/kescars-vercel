import React from 'react'

import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { TiArrowSortedUp } from "react-icons/ti"
import { TiArrowSortedDown } from "react-icons/ti"
import { RiContractFill } from "react-icons/ri"
import { HiMiniUsers } from "react-icons/hi2"
import { FaHandHoldingMedical } from "react-icons/fa"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
    title: string
    data: number
    situation?: boolean
    difference: string
    categorie?: string
    children: React.ReactNode
}

export const CardWrapper = ({
    title,
    difference,
    situation = true,
    data,
    children
}: Props) => {

    return (
        <Card className='cardShadow'>
            <CardHeader className='flex flex-row items-start justify-between'>
                <div className='flex flex-col items-start'>
                    <span className='text-sm text-gray-800 dark:text-white font-normal'>
                        {title}
                    </span>
                    <div className='flex items-end'>
                        <span className='font-bold text-6xl'>
                            {data}
                        </span>
                        <div className='font-medium text-xs pb-1'>
                            {situation ? (
                                <div className=' text-green-500 flex items-center'>
                                    <span>
                                        <TiArrowSortedUp size={20} />
                                    </span>
                                    <span>{difference}</span>
                                </div>
                            ) : (
                                <div className='text-red-500 flex items-center'>
                                    <span>
                                        <TiArrowSortedDown size={20} />
                                    </span>
                                    <span>{difference}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger >
                                <Badge variant={'outline'} className='px-3 py-2 bg-green-500/10 text-green-500 rounded-full'>
                                    <RiContractFill size={17}/>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent className='bg-green-500/10 text-green-600'>
                                title
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger >
                                <Badge variant={'outline'} className='px-3 py-2 bg-purple-500/10 text-purple-500 rounded-full'>
                                    <IoCheckmarkDoneOutline size={17}/>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent className='bg-purple-500/10 text-purple-600'>
                                title
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger >
                                <Badge variant={'outline'} className='px-3 py-2 bg-blue-500/10 text-blue-500 rounded-full'>
                                    <FaHandHoldingMedical size={17}/>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent className='bg-blue-500/10 text-blue-600'>
                                title
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger >
                                <Badge variant={'outline'} className='px-3 py-2 bg-red-500/10 text-red-500 rounded-full'>
                                    <HiMiniUsers size={17}/>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent className='bg-red-500/10 text-red-600'>
                                title
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
