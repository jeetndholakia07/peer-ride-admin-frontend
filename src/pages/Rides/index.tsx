import ReactTable from "../../components/Table/index";
import TableCard from "../../components/Table/TableCard";
import Pagination from "../../components/Pagination";
import useFetch from "../../hooks/useFetch";
import { api } from "../../hooks/api";
import { useMemo, useState } from "react";
import PageLoader from "../../components/Loading/PageLoader";
import FilterMenu from "../../components/Filter/FilterMenu";
import RideFilter from "../../components/Filter/RideFilter";
import { rideColumns } from "./rideColumns";

const RidesPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const {
        data,
        isLoading,
        currentPage,
        totalPages,
        fetchDataHandler,
        limit,
        page
    } = useFetch<any>({
        url: api.admin.rides,
        pageNo: 1,
        pageLimit: 5,
        queryName: "rides"
    });

    const columns = useMemo(() => rideColumns, []);

    return (
        <>
            {isLoading && <PageLoader />}
            <TableCard fetchDataHandler={fetchDataHandler} filtersComponent={
                <FilterMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} isCalendarOpen={isCalendarOpen}>
                    <RideFilter setMenuOpen={setMenuOpen} fetchDataHandler={fetchDataHandler}
                        limit={limit} setIsCalendarOpen={setIsCalendarOpen}
                    />
                </FilterMenu>
            }>
                <ReactTable columns={columns} data={data}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} page={page} limit={limit} handlePageChange={fetchDataHandler} />
                </ReactTable>
            </TableCard>
        </>
    )
}
export default RidesPage;