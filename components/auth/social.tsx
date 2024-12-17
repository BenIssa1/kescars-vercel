'use client'


import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from "react-icons/fa"

import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

export const Social = () => {
    const pathname = usePathname()

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={'lg'}
                className='w-full flex gap-x-3 shadow'
                variant='outline'
            >
                <FcGoogle className='h-6 w-6'/>
                <span className='text-primary-500 font-medium'>
                    {pathname === '/auth/login' ? 'Connectez-vous avec Google' : 'Créez un compte avec Google'}
                </span>
            </Button>
        </div>
    )
}