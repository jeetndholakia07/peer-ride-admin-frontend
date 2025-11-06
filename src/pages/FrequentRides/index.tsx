import useFetch from "../../hooks/useFetch";
import TableCard from "../../components/Table/TableCard";
import ReactTable from "../../components/Table/index";
import Pagination from "../../components/Pagination";
import { useMemo } from "react";
import { tableColumns } from "./tableColumns";
import { api } from "../../hooks/api";
import PageLoader from "../../components/Loading/PageLoader";

const FrequentRidesPage = () => {
    const {
        data,
        isLoading,
        currentPage,
        totalPages,
        fetchDataHandler,
        limit,
        page
    } = useFetch<any>({
        url: api.admin.frequentRides,
        pageNo: 1,
        pageLimit: 5,
        queryName: "frequentRides"
    });

    const columns = useMemo(() => tableColumns, []);

    return (
        <>
            {isLoading && <PageLoader />}
            <TableCard fetchDataHandler={fetchDataHandler} isFilter={false} isAdd={true}>
                <ReactTable columns={columns} data={data}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} page={page} limit={limit} handlePageChange={fetchDataHandler} />
                </ReactTable>
            </TableCard>
        </>
    )
}
export default FrequentRidesPage;