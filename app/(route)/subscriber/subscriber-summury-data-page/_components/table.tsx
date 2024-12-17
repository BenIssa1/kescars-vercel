import { Prisma, Subscriber } from "@prisma/client";
import { fetchAllSubscribers } from "@/data/subscriber";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { currentUser } from "@/lib/auth"

export type SubscriberType =  Prisma.SubscriberGetPayload<{
  include: {
   Insured: true,
   bringer: true
  }
}>

async function getData(): Promise<SubscriberType[]> {
  // current user
  const user = await currentUser();
  // Fetch data from your API here.
  return await fetchAllSubscribers(user?.brokerageCompanyId);
}

export async function Table() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
