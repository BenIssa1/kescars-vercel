'use client'

import * as z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEdgeStore } from '@/lib/edgestore'
import { Form } from '@/components/ui/form'
import CustomFormField from '@/components/custom-form-field'
import toast from 'react-hot-toast'

import { FormFieldType } from '@/types'
import { CompanySchema } from '@/schemas'
import { CompanyDefaultValues } from '@/constants/company-default-values'
import { createCompany } from '@/actions/company'
import { SingleImageDropzone } from '@/components/edgestore/single-image-dropzone'
import { SubmitButton } from '@/components/submit-button'
import { useCurrentUser } from '@/hooks/use-current-user'


export const CompanyRegistrationForm = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
    //################ EDGESTORE #######################
    const [file, setFile] = React.useState<File>()
    const { edgestore } = useEdgeStore()
    //################ EDGESTORE ####################### 

    const [isLoading, setIsLoading] = React.useState(false)

    const form = useForm<z.infer<typeof CompanySchema>>({
        resolver: zodResolver(CompanySchema),
        defaultValues: CompanyDefaultValues
    })

    const user = useCurrentUser()

    const handleSubmit = async (values: z.infer<typeof CompanySchema>) => {
        setIsLoading(true)

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
            })
            values.avatar = res.url
        }

        values.brokerageCompanyId = user?.brokerageCompanyId
        const response = await createCompany(values)

        if (response.success) {
            if (setOpen) {
                setOpen(false)
            }
            form.reset()

            toast.success("Company bien enregistrer")
        } else {
            setIsLoading(false)
            toast.error("Echec de l'enregistrement")
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
                        label="Nom de la compagnie d'assurance"
                        placeholder='johnAssurance'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label="Email"
                        placeholder='johnassurance@example.com'
                    />
                </div>
                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='address'
                        label="Adresse"
                        placeholder='Cocody, Abidjan'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='phone'
                        label="Telephone"
                        placeholder=''
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
