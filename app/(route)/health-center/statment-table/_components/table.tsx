import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getHealthcareTreatementByDeclarant } from "@/data/treatment"
import { HealthcareTreatment } from "@/types"


async function getData(): Promise<HealthcareTreatment[]> {
    // Fetch data from your API here.
    return  await getHealthcareTreatementByDeclarant()
}

export async function Table() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}