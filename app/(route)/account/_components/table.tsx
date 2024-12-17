import { User } from "@prisma/client"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchAllUsers } from "@/data/user"
import { currentUser } from "@/lib/auth"


async function getData(): Promise<User[]> {
    // current user
    const user = await currentUser();
    // Fetch data from your API here.
    return  await fetchAllUsers(user?.brokerageCompanyId, user?.id);
    
}

export async function Table() {
    const data = await getData()

    return (
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={data} /> 
        </div>
    )
}
