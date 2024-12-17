import React from 'react'
import StatementSearchBar from './statment-search-bar'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { StatmentRegistrationModalForm } from './forms/statement/registration-modal'

export const EditionCard = () => {
    return (
        <div className=''>
            <div className='h-full flex flex-col items-center justify-center'>
                <div className=' p-10 '>
                    {/* champs de recherche */}
                    <div className='mb-4'>
                        <StatementSearchBar />
                    </div>
                    {/* champs du formulaire */}

                    <div className='flex items-center justify-center mb-6'>
                        <div className='relative h-[450px] w-[700px]'>
                            <div className='absolute object-cover h-full w-full rounded-md shadow-2xl' style={{ backgroundImage: "url(/jpg/carte.jpg)", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <div className='h-[205px] w-[181px] absolute top-[153px] left-[47px]'>
                                <Image
                                    src={''}
                                    alt=''
                                    className=''
                                    fill
                                />
                            </div>
                            <div className='absolute left-[270px] top-[140px] space-y-0.5 uppercase text-sm'>
                                <div className='-space-y-1'>
                                    <p className='font-bold text-green-700'>Nom...</p>
                                    <p className='font-extrabold'>Nom</p>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className='font-bold text-green-700'>prenom...</p>
                                        <p className='font-extrabold'>Prenom</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>date de naissance...</p>
                                        <p className='font-extrabold'>date de naissance</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>lieu de naissance...</p>
                                        <p className='font-extrabold'>lieu de naissance</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>domicile...</p>
                                        <p className='font-extrabold'>domicile</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>groupe sanguin...</p>
                                        <p className='font-extrabold'>groupe sanguin</p>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='-space-y-1 mt-1'>
                                        <Badge className='bg-green-500 mb-0.5 hover:bg-green-500' variant={'default'}>
                                            Actif
                                        </Badge>
                                        <p className='font-extrabold'>statut</p>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute left-[570px] top-[140px] space-y-0.5 uppercase text-sm'>
                                <div className='-space-y-1'>
                                    <p className=''>police...</p>
                                    <p className='font-extrabold'>police</p>
                                </div>
                                <div className='-space-y-1'>
                                    <p className=''>n cni...</p>
                                    <p className='font-extrabold'>n cni</p>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>nationalite...</p>
                                        <p className='font-extrabold'>nationalite</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='-space-y-1'>
                                        <p className=''>date...</p>
                                        <p className='font-extrabold'>date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}
