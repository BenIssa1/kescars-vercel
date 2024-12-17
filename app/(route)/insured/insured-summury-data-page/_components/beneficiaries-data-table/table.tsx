import { fetchAllBeneficiaries } from "@/data/beneficiary";
import { Beneficiary } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Beneficiary[]> {
    return await fetchAllBeneficiaries();
}

export async function Table () {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

