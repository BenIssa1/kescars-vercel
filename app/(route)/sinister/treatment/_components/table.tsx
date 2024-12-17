import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllTreatments } from "@/data/treatment"
import { TypeTreatment } from "@/types"


async function getData(): Promise<TypeTreatment[]> {
    // Fetch data from your API here.
    return  await fetchAllTreatments()
}

export async function Table() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
