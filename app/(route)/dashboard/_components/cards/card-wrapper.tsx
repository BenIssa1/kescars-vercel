import React from 'react'
import { cn } from '@/lib/utils'

import { CardContent, CardHeader } from '@/components/ui/card'
import { roboto } from '@/font/fonts'

interface Props {
    title: string
    count?: number
    differenceUp?: string
    differenceDown?: string
    differenceTextColor?: string
    differenceIconUp?: React.ReactNode
    differenceIconDown?: React.ReactNode
    iconClassName: string
    className?: string
    icon?: React.ReactNode
}

export const CardWrapper = ({
    title,
    count,
    differenceUp,
    differenceDown,
    differenceIconUp,
    differenceIconDown,
    iconClassName,
    icon,
    className,
}: Props) => {
    return (
        <div className={cn('w-full border-none cardShadow rounded-xl', className)}>
            <CardHeader className={cn(
                roboto.className,
                'flex flex-row items-center justify-between p-4 -mb-6'
            )}>
                <div className='flex flex-col'>
                    <h5 className='text-sm text-gray-800 dark:text-white font-normal'>
                        {title}
                    </h5>
                </div>
                <div className={cn(iconClassName)}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent className='p-4 flex items-end justify-center'>
                <span className='flex items-center justify-center font-black text-6xl'>
                    {count}
                </span>
                <div className={cn('flex flex-col text-xs font-medium mb-2 gap-1')}>
                    <div className='flex items-start text-green-500'>
                        <span className=''>
                            {differenceIconUp}
                        </span>
                        <span>
                            {differenceUp}
                        </span>
                    </div>
                    <div className='flex items-end text-red-500'>
                        <span className=''>
                            {differenceIconDown}
                        </span>
                        <span>
                            {differenceDown}
                        </span>
                    </div>

                </div>
            </CardContent>
        </div>
    )
}
