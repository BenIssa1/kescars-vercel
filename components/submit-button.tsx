import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ButtonProps {
    isPending: boolean
    loaderLabel: string
    className?: string
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const SubmitButton = ({
    isPending,
    className,
    loaderLabel,
    onClick,
    children
}: ButtonProps) => {
    return (
        <Button
            onClick={onClick}
            type='submit'
            disabled={isPending}
            className={cn(className, 'w-full')}
        >
            {isPending ? (
                <div className='relative flex items-center '>
                <span className=''>{loaderLabel}</span>
                    <span className='absolute right-[-80px]'>
                        <Image
                            src="/svg/loader.svg"
                            alt="loader"
                            width={24}
                            height={24}
                            className='animate-spin'
                        />
                    </span>
                </div>
            ) : children}
        </Button>
    )
}
