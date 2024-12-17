'use client'

import * as z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import CustomFormField from '@/components/custom-form-field'
import toast from 'react-hot-toast'
import { SingleImageDropzone } from '@/components/edgestore/single-image-dropzone'

import { FormFieldType } from '@/types'
import { BrokerageCompanySchema } from '@/schemas'
import { SubmitButton } from '@/components/submit-button'
import { BrokerageCompanyDefaultValues } from '@/constants/brokerage-company-defaultValues'
import { registerBrokerageCompany } from '@/actions/brokerage-company'
import { useEdgeStore } from '@/lib/edgestore'

export const BrokerageCompanyRegistrationForm = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    //################ EDGESTORE #######################
    const [file, setFile] = React.useState<File>()
    const { edgestore } = useEdgeStore()
    //################ EDGESTORE ####################### 

    const form = useForm<z.infer<typeof BrokerageCompanySchema>>({
        resolver: zodResolver(BrokerageCompanySchema),
        defaultValues: BrokerageCompanyDefaultValues
    })

    const handleSubmit = async (values: z.infer<typeof BrokerageCompanySchema>) => {
        setIsLoading(true)

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
            })
            values.image = res.url
        }

        const response = await registerBrokerageCompany(values)

        if (response.success) {
            if (setOpen) {
                setOpen(false)
            }
            form.reset()

            toast.success("Brokerage company bien enregistrer !")
        } else {
            setIsLoading(false)
            toast.error("Echec de l'enregistrement !")
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-5 flex-1 mt-6'
            >
                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='name'
                        label="Nom de l'entreprise"
                        placeholder='Ex: Kescars'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='number'
                        label="Téléphone"
                        placeholder='0707070707'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label="Email"
                        placeholder='johnassurance@example.com'
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
