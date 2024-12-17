'use client'

import * as z from 'zod'
import React, { useTransition, useState } from 'react'

import {
    Form,
} from '@/components/ui/form'

import { useEdgeStore } from '@/lib/edgestore'
import { SingleImageDropzone } from '../edgestore/single-image-dropzone'
import CustomFormField from '../custom-form-field'
import { FormFieldType } from '@/types'
import { SubmitButton } from '../submit-button'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { RegisterDefaultValues } from '@/constants/register-default-field'
import { register } from '@/actions/register'
import { FormError } from '@/components/form-error'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
    const router = useRouter()  
    const [file, setFile] = React.useState<File>()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>();

    const { edgestore } = useEdgeStore()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: RegisterDefaultValues
    })

    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    } else {
                        form.reset();
                        toast.success("User bien enregistrer !")
                        router.push('/auth/login')
                    }

                }).catch(() => setError('Something went wrong!'))
        });
    }

    return (
        <CardWrapper
            headerLabel="Créer un compte pour commencer."
            backButtonLabel="Vous avez déjà un compte?"
            backButtonHref="/auth/login"
            showSocial
            className='w-full max-w-md'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >

                    <div className='space-y-4'>

                        <div className='flex gap-6 items-center'>
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name='name'
                                label='Nom'
                                placeholder='John Doe'
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name='email'
                                label='Email'
                                placeholder='johndoe@example.com'
                            />
                        </div>

                        <div className='flex gap-6 items-center'>
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name='password'
                                inputType='password'
                                label='Mot de passe'
                                placeholder='******'
                                iconAlt='user icon'
                            />
                        </div>

                        <SingleImageDropzone
                            id="image"
                            name="image"
                            value={file}
                            width={400}
                            height={100}
                            className=''
                            onChange={(file) => {
                                setFile(file);
                            }}
                        />
                    </div>

                    <FormError message={error} />

                    <SubmitButton
                        onClick={async () => {
                            /* if (file) {
                                const res = await edgestore.publicFiles.upload({
                                    file,
                                })
                            } */
                        }}
                        isPending={isPending}
                        loaderLabel='Création du compte'
                    >
                        {"Créer un compte"}
                    </SubmitButton>
                </form>
            </Form>
        </CardWrapper>
    )
}