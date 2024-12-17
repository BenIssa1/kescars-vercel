'use client'

import React, { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Insured } from '@prisma/client'
import { DataTable } from './data-table'
import { columns } from './columns'

interface insuredButtonModalProps {
    insured: Insured[];
}

export const InsuredsButtonModal = ({ insured }: insuredButtonModalProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Badge
                    className="bg-primary/80 flex gap-1 cursor-pointer"
                >
                    <div className="">{insured.length}</div>
                    <Separator />
                    <div>Assurés</div>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className='w-[1220px] overflow-hidden' align='end'>
                <DataTable columns={columns} data={insured || []} />
            </PopoverContent>
        </Popover>
    )
}
