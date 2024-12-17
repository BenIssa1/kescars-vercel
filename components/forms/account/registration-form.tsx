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
import { RegisterSchema } from '@/schemas'
import { SelectItem } from '@/components/ui/select'
import { SubmitButton } from '@/components/submit-button'
import { AccountDefaultValues } from '@/constants/account-default-values'
import { register } from '@/actions/register'
import { roles } from '@/constants'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useEdgeStore } from '@/lib/edgestore'


export const AccountRegistrationForm = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    //################ EDGESTORE #######################
    const [file, setFile] = React.useState<File>()
    const { edgestore } = useEdgeStore()
    //################ EDGESTORE ####################### 

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: AccountDefaultValues
    })

    const user = useCurrentUser()

    const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setIsLoading(true)

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
            })
            values.image = res.url
        }
        
        values.brokerageCompanyId = user?.brokerageCompanyId
        const response = await register(values)

        if (response.success) {
            if (setOpen) {
                setOpen(false)
            }
            form.reset()

            toast.success("User bien enregistrer !")
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
                        label="Nom"
                        placeholder='John Doe'
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
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='phone'
                        label="Telephone"
                        placeholder='0707070707'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        inputType='password'
                        name='password'
                        label="Password"
                        placeholder='*******'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name='role'
                        label='Rôle'
                        placeholder='Choisir votre rôle'
                    >
                        {roles?.map((role) => (
                            <SelectItem
                                key={role.label}
                                value={role.value}
                            >
                                <p>{role.label}</p>
                            </SelectItem>
                        ))}
                    </CustomFormField>
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
