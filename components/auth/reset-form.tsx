'use client'

import * as z from 'zod'

import React, { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,

} from '@/components/ui/form'


import { CardWrapper } from '@/components/auth/card-wrapper'

import CustomFormField from '@/components/custom-form-field'
import { FormFieldType } from '@/types'
import { SubmitButton } from '@/components/submit-button'
import { ResetSchema } from '@/schemas'
import { reset } from "@/actions/reset";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    }


    return (
        <CardWrapper
            headerLabel="Mot de passe oublié?"
            backButtonLabel="Retour à la connexion"
            backButtonHref="/auth/login"
            className='w-full max-w-md'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name='email'
                            label='Email'
                            placeholder='johndoe@example.com'
                            iconAlt='user icon'
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <SubmitButton
                        isPending={isPending}
                        loaderLabel='Envoi en cours...'
                    >
                        Envoyer un e-mail de réinitialisation
                    </SubmitButton>
                </form>
            </Form>
        </CardWrapper>
    )
}