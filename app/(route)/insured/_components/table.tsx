import { Insured } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllInsureds } from "@/data/insured"
import { fetchAllSubscribers } from "@/data/subscriber"
import { fetchAllCompanies } from "@/data/company"
import { currentUser } from "@/lib/auth"


async function getData(): Promise<Insured[]> {
    // current user
    const user = await currentUser();
    // Fetch data from your API here.
    return await fetchAllInsureds(user?.brokerageCompanyId)

}

export async function Table() {
    // current user
    const user = await currentUser();
    const data = await getData()
    const subscribers = await fetchAllSubscribers(user?.brokerageCompanyId)
    const companies = await fetchAllCompanies(user?.brokerageCompanyId)

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={data}
                subscribers={subscribers}
                companies={companies}
            />
        </div>
    )
}
