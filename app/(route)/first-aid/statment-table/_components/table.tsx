import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getFirstAidersTreatementByDeclarant } from "@/data/treatment"
import { FirstAiderTreatment } from "@/types"


async function getData(): Promise<FirstAiderTreatment[]> {
    // Fetch data from your API here.
    return  await getFirstAidersTreatementByDeclarant()
}

export async function Table() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}