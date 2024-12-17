'use client'

import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Beneficiary } from '@prisma/client'
import { DataTable } from './data-table'
import { columns } from './columns'

interface beneficiariesButtonModalProps {
    beneficiaries: Beneficiary[];
}


export const BeneficiariesButtonModal = ({ beneficiaries }: beneficiariesButtonModalProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Badge
                    className="bg-primary/80 flex gap-1 cursor-pointer"
                >
                    <div className="">{beneficiaries.length}</div>
                    <Separator />
                    <div>Bénéficiaire</div>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className='w-[1220px] overflow-hidden' align='end'>
                <DataTable columns={columns} data={beneficiaries || []} />
            </PopoverContent>
        </Popover>
    )
}
