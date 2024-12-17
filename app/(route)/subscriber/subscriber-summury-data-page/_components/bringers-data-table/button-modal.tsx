'use client'

import React, { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from '@/components/ui/badge'
import { Bringer } from '@prisma/client'
import { columns } from './columns'
import { DataTable } from './data-table'

interface bringerButtonModalProps {
    bringer: Bringer;
}

// A faire : recuperer les données de la table Bringers
export const BringersButtonModal = ({ bringer }: bringerButtonModalProps) => {
    const [open, setOpen] = React.useState(false)
    let bringerDatas: Bringer[]  = [bringer]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Badge
                    className="bg-primary/80 flex gap-1 cursor-pointer"
                >
                    <div>Apporteur</div>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className='w-[1220px] overflow-hidden' align='end'>
                <DataTable columns={columns} data={bringerDatas || []} />
            </PopoverContent>
        </Popover>
    )
}
