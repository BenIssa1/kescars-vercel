import { Bringer } from "@prisma/client"
import { fetchAllBringers } from "@/data/bringer"
import { columns } from "./colums"
import { DataTable } from "./data-table"
import { currentUser } from "@/lib/auth"

async function getData(): Promise<Bringer[]> {
     // current user
     const user = await currentUser();
    // Fetch data from your API here.
    return  await fetchAllBringers(user?.brokerageCompanyId)
    
}

export async function Table() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
