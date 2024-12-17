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
import { CreateCompny } from '@/components/action-buttons'
import { CompanyRegistrationForm } from './registration-form'

export const CompanyRegistrationModalForm = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <CreateCompny />
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
                        <DialogTitle className='capitalize text-2xl'>Enregistrer une nouvelle compagnie</DialogTitle>
                        <DialogDescription>
                            Renseigner les champs ci-dessous pour enregistrer une nouvelle compagnie
                        </DialogDescription>
                    </DialogHeader>
                    
                    <CompanyRegistrationForm setOpen={setOpen} />
                </div>

            </DialogContent>
        </Dialog>
    )
}
