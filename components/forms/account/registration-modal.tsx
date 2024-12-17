import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'
import { CreateAccount } from '@/components/action-buttons'
import { AccountRegistrationForm } from './registration-form'

export const AccountRegistrationModalForm = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <CreateAccount />
            </DialogTrigger>
            <DialogContent className='flex items-center justify-between'>
                <div className='relative h-[600px] min-w-[35%] rounded-md'>
                    <Image 
                        src={'/jpg/companie-register-img.jpg'}
                        alt='img'
                        fill
                        className='object-cover w-full h-full rounded-md'
                    />
                </div>
                <div>
                    <DialogHeader>
                        <DialogTitle className='capitalize text-2xl'>Enregistrer un compte</DialogTitle>
                        <DialogDescription>
                            Renseigner les champs ci-dessous pour enregistrer un nouveau compte
                        </DialogDescription>
                    </DialogHeader>
                    
                    <AccountRegistrationForm setOpen={setOpen} />
                </div>

            </DialogContent>
        </Dialog>
    )
}
