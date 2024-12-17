'use client'

import * as z from 'zod'
import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { useEdgeStore } from '@/lib/edgestore'
import { SubscriberDefaultValues } from '@/constants/subscriber-default-values'
import { Form } from '@/components/ui/form'
import { FormFieldType } from '@/types'
import { SingleImageDropzone } from '@/components/edgestore/single-image-dropzone'
import { Bringer } from '@prisma/client'
import { SelectItem } from '@/components/ui/select'
import { SubmitButton } from '@/components/submit-button'
import { createSubscriber } from '@/actions/subscriber'
import { SubscriberSchema } from '@/schemas'
import CustomFormField from '@/components/custom-form-field'
import { useCurrentUser } from '@/hooks/use-current-user'


interface Props {
    setOpen: (open: boolean) => void;
    bringers?: Bringer[];
}

export const SubscriberRegistrationForm: React.FC<Props> = ({ setOpen, bringers }) => {
    //################ EDGESTORE #######################
    const [file, setFile] = React.useState<File>()
    const { edgestore } = useEdgeStore()
    //################ EDGESTORE ####################### 

    const [isLoading, setIsLoading] = React.useState(false)
    
    const user = useCurrentUser()

    const form = useForm<z.infer<typeof SubscriberSchema>>({
        resolver: zodResolver(SubscriberSchema),
        defaultValues: SubscriberDefaultValues
    })

    const handleSubmit = async (values: z.infer<typeof SubscriberSchema>) => {
        setIsLoading(true)

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
            })
            values.avatar = res.url
        }

        values.brokerageCompanyId = user?.brokerageCompanyId
        const response = await createSubscriber(values)

        if (response.success) {
            if (setOpen) {
                setOpen(false)
            }
            form.reset()

            toast.success('Souscripteur bien enregistrer')
        } else {
            setIsLoading(false)
            toast.error("Echec de l'enregistrement")
        }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-5 flex-1 mt-6 h-[520px] overflow-scroll remove-scrollbar p-2'
            >
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name='bringerId'
                        label='Apporteur'
                        placeholder='Choisi un apporteur'
                    >
                        {bringers?.map((bringer) => (
                            <SelectItem key={bringer.id} value={bringer.id}>
                                <div className=' shad-select-whit-avatar'>
                                    <div className='relative w-9 h-9  aspect-square'>
                                        <Image
                                            src={bringer.avatar || ''}
                                            fill
                                            alt={bringer.firstName}
                                            className='rounded-full bg-cover border border-primary'
                                        />
                                    </div>

                                    <p>{bringer.firstName + ' ' + bringer.lastName}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='prime'
                        label='Prime'
                        placeholder='Ex: 20000'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='subscriberFullName'
                        label='Nom'
                        placeholder='Ex: Doe Assurance'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='taxpayer'
                        label='N° Compte Contribuable'
                        placeholder='Ex: CI1234567890AB'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='fieldOfActivity'
                        label="Domaine d'activité"
                        placeholder='Ex: Informatique'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label='Email'
                        placeholder='Ex: compte@gmail.com'
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='address'
                        label="Adresse"
                        placeholder='Ex: Cocody, Abidjan'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='phoneNumber'
                        label="Telephone"
                        placeholder='Ex: +225 05 45 05 4785'
                    />
                </div>

                <div className='w-full flex items-center justify-center'>
                    <SingleImageDropzone
                        id="avatar"
                        name="avatar"
                        width={500}
                        height={200}
                        value={file}
                        className='bg-white'

                        onChange={(file) => {
                            setFile(file);
                        }}
                    />
                </div>

                <SubmitButton
                    onClick={async () => {
                        if (file) {
                            return await edgestore.publicFiles.upload({
                                file,
                            })
                        }
                    }}
                    isPending={isLoading}
                    loaderLabel='Enregistrement...'
                >
                    Enregistrer
                </SubmitButton>
            </form>
        </Form>
    )
} 