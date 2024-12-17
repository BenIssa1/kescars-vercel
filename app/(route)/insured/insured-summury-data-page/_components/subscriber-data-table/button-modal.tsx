'use client'

import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from '@/components/ui/badge'
import { Subscriber } from '@prisma/client'
import { DataTable } from './data-table'
import { columns } from './columns'

interface subscriberButtonModalProps {
    subscriber: Subscriber;
}


export const SubscribersButtonModal = ({ subscriber }: subscriberButtonModalProps) => {
    const [open, setOpen] = React.useState(false)
    const subscriberDatas: Subscriber[] = [subscriber]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Badge
                    className="bg-primary/80 flex gap-1 cursor-pointer"
                >
                    <div>Subscripteur</div>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className='w-[1220px] overflow-hidden' align='end'>
                <DataTable columns={columns} data={subscriberDatas || []} />
            </PopoverContent>
        </Popover>
    )
}
