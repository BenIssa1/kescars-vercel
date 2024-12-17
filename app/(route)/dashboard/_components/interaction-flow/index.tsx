import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'
import React from 'react'

export const InteractionFlow = () => {
    return (
        <div className='flex flex-items-center gap-8 '>
            <div className='mt-1'>
                <h2 className='font-bold'>{"Flux d'interactions"}</h2>
            </div>
            <Badge className='hover:shadow-dbFluxInterationItemShadow bg-secondary text-primary dark:text-white hover:bg-primary hover:text-secondary cursor-pointer animate'>
                <Plus />
            </Badge>

            <Badge className='bg-muted shadow p-2 flex items-center justify-between gap-3 hover:shadow-dbFluxInterationItemShadow hover:bg-muted cursor-pointer animate'>
                <span className='bg-primary h-2 w-2 rounded-full' />
                <div className='flex items-center justify-between gap-5 text-black dark:text-white'>
                    <h5 className='text-[12px] '>Prestataire 1</h5>
                    <h4 className='text-[13px] font-bold'>0 intér.</h4>
                </div>
            </Badge>
            <Badge className='bg-muted shadow p-2 flex items-center justify-between gap-3 hover:shadow-dbFluxInterationItemShadow hover:bg-muted cursor-pointer animate'>
                <span className='bg-primary h-2 w-2 rounded-full' />
                <div className='flex items-center justify-between gap-5 text-black dark:text-white'>
                    <h5 className='text-[12px] '>Prestataire 1</h5>
                    <h4 className='text-[13px] font-bold'>0 intér.</h4>
                </div>
            </Badge>
            <Badge className='bg-muted shadow p-2 flex items-center justify-between gap-3 hover:shadow-dbFluxInterationItemShadow hover:bg-muted cursor-pointer animate'>
                <span className='bg-primary h-2 w-2 rounded-full' />
                <div className='flex items-center justify-between gap-5 text-black dark:text-white'>
                    <h5 className='text-[12px] '>Prestataire 1</h5>
                    <h4 className='text-[13px] font-bold'>0 intér.</h4>
                </div>
            </Badge>
            <Badge className='bg-muted shadow p-2 flex items-center justify-between gap-3 hover:shadow-dbFluxInterationItemShadow hover:bg-muted cursor-pointer animate'>
                <span className='bg-primary h-2 w-2 rounded-full' />
                <div className='flex items-center justify-between gap-5 text-black dark:text-white'>
                    <h5 className='text-[12px] '>Prestataire 1</h5>
                    <h4 className='text-[13px] font-bold'>0 intér.</h4>
                </div>
            </Badge>

        </div>
    )
}
