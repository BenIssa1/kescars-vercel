import { fetchAllInsureds } from "@/data/insured";
import { Insured, Prisma } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { currentUser } from "@/lib/auth"

export type InsuredType =  Prisma.InsuredGetPayload<{
  include: {
    beneficiaries: true,
    company: true,
    subscriber: true
  }
}>

async function getData(): Promise<InsuredType[]> {
   // current user
      const user = await currentUser();
  // Fetch data from your API here.
  return await fetchAllInsureds(user?.brokerageCompanyId);
}

export async function Table () {
    const data = await getData();
    return (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      );;
};


