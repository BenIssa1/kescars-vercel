import { Company } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllCompanies } from "@/data/company"
import { currentUser } from "@/lib/auth"

async function getData(): Promise<Company[]> {
     // current user
     const user = await currentUser();
    // Fetch data from your API here.
    return  await fetchAllCompanies(user?.brokerageCompanyId)
}

export async function Table() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
