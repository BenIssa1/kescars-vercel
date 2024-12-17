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
import { CreateSubscriber } from '@/components/action-buttons'
import { SubscriberRegistrationForm } from './registration-form'
import { Bringer } from '@prisma/client'


export const SubscriberRegistrationModalForm = ({ bringers }: {bringers: Bringer[]}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <CreateSubscriber />
            </DialogTrigger>
            <DialogContent className='flex items-center justify-between'>
                <div className='relative h-[600px] min-w-[35%] rounded-md shadow-md'>
                    <Image 
                        src={'/png/subscriber-registration-img.png'}
                        alt='img'
                        fill
                        className='object-cover w-full h-full rounded-md shadow-md'
                    />
                </div>
                <div className=''>
                    <DialogHeader>
                        <DialogTitle className='capitalize text-2xl'>Enregistrer un nouveau souscripteur</DialogTitle>
                        <DialogDescription>
                            Renseigner les champs ci-dessous pour ajouter un nouveau souscripteur
                        </DialogDescription>
                    </DialogHeader>

                    <SubscriberRegistrationForm setOpen={setOpen} bringers={bringers}  />
                </div>

            </DialogContent>
        </Dialog>
    )
}
