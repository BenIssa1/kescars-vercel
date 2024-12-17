'use client'

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
import { Company, Subscriber } from '@prisma/client'
import { CreateInsured } from '@/components/action-buttons'
import { InsuredRegistrationForm } from './registration-form'

interface Props {
    subscribers: Subscriber[]
    companies: Company[]
} 

export const InsuredRegistrationModalForm = ({
    subscribers,
    companies
}: Props) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <CreateInsured />
            </DialogTrigger>
            <DialogContent className='flex items-center justify-between'>
                <div className='relative h-[600px] min-w-[35%] rounded-md shadow-md'>
                    <Image
                        src={'/jpg/insured-registration-img.jpg'}
                        alt='img'
                        fill
                        className='object-cover w-full h-full rounded-md shadow-md'
                    />
                </div>
                <div className=''>
                    <DialogHeader>
                        <DialogTitle className='capitalize text-2xl'>Enregistrer un nouvel Assuree</DialogTitle>
                        <DialogDescription>
                            Renseigner les champs ci-dessous pour ajouter un nouvel Assuree
                        </DialogDescription>
                    </DialogHeader>

                    <InsuredRegistrationForm
                        setOpen={setOpen}
                        subscribers={subscribers}
                        companies={companies}
                    />
                </div>

            </DialogContent>
        </Dialog>
    )
}
