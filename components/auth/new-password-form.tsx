'use client'

import * as z from 'zod'

import React, { useTransition, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from 'next/navigation'
import { useForm } from "react-hook-form"

import {
    Form,
} from '@/components/ui/form'
import { CardWrapper } from '@/components/auth/card-wrapper'

import { NewPasswordSchema } from '@/schemas'
import { FormFieldType } from '@/types'
import CustomFormField from '../custom-form-field'
import { SubmitButton } from '../submit-button'

import { FormError } from "@/components/form-error";
import { newPassword } from "@/actions/new-password";
import { FormSuccess } from "@/components/form-success";

export const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    }

    return (
        <CardWrapper
            headerLabel="Entrer un nouveau mot de passe"
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
                            name='password'
                            inputType='password'
                            label='Mot de passe'
                            placeholder='******'
                            iconAlt='user icon'
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <SubmitButton
                        isPending={isPending}
                        loaderLabel='Réinitialisation...'
                    >
                        Réinitialiser mot de passe
                    </SubmitButton>
                </form>
            </Form>
        </CardWrapper>
    )
}