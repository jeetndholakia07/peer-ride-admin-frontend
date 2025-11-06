export const tableColumns = [
    {
        header: "Sr. No.",
        accessorFn: (_row: any, index: number) => index + 1,
        id: "srNo"
    },
    {
        header: "From",
        accessorFn: (row: any) => row.from
    },
    {
        header: "To",
        accessorFn: (row: any) => row.to
    },
]