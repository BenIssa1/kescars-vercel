import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { CreateBringer } from '@/components/action-buttons'
import Image from 'next/image'
import { BringerRegistrationForm } from './registration-form'

export const BringerRegistrationModalForm = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <CreateBringer />
            </DialogTrigger>
            <DialogContent className='flex items-center justify-between'>
                <div className='relative h-[600px] min-w-[35%] rounded-md'>
                    <Image 
                        src={'/png/bringer-register-img.png'}
                        alt='img'
                        fill
                        className='object-cover w-full h-full rounded-md'
                    />
                </div>
                <div>
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Enregistrer un nouvel Apporteur</DialogTitle>
                        <DialogDescription>
                            Renseigner les champs ci-dessous pour ajouter un nouvel Apporteur
                        </DialogDescription>
                    </DialogHeader>

                    <BringerRegistrationForm setOpen={setOpen} />
                </div>

            </DialogContent>
        </Dialog>
    )
}
