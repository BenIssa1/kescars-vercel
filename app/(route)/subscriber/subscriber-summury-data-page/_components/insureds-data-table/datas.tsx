'use server'

import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Subscriber } from "@prisma/client";
import { columns } from './columns'
import { currentUser } from "@/lib/auth"
import { fetchAllSubscribers } from "@/data/subscriber";


async function getData(): Promise<Subscriber[]> {
  // current user
  const user = await currentUser();
  // Fetch data from your API here.
  return await fetchAllSubscribers(user?.brokerageCompanyId);
}

export async function Datas() {

  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      Hello
    </div>
  );
}
