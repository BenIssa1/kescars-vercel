// cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("amount"))
//     const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//     }).format(amount)

//     return <div className="text-left font-medium">{formatted}</div>
// },