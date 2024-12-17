import { Subscriber } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllSubscribers } from "@/data/subscriber"
import { fetchAllBringers } from "@/data/bringer"
import { currentUser } from "@/lib/auth"

async function getData(): Promise<Subscriber[]> {
    // current user
    const user = await currentUser();
    // Fetch data from your API here.
    return  await fetchAllSubscribers(user?.brokerageCompanyId)
}

export async function Table() {
    // current user
    const user = await currentUser();
    const data = await getData()
    const bringers = await fetchAllBringers(user?.brokerageCompanyId)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} bringers={bringers} />
        </div>
    )
}
 