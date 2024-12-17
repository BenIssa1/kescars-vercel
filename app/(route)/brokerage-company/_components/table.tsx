import { BrokerageCompany } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllBrokerageCompany } from "@/data/brokerage-company"


async function getData(): Promise<BrokerageCompany[]> {
    // Fetch data from your API here.
    return  await fetchAllBrokerageCompany()
    
}

export async function Table() {
    const data = await getData()

    return (
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={data} /> 
        </div>
    )
}
