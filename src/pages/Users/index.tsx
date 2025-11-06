import ReactTable from "../../components/Table/index";
import TableCard from "../../components/Table/TableCard";
import Pagination from "../../components/Pagination";
import useFetch from "../../hooks/useFetch";
import { api } from "../../hooks/api";
import { useMemo, useState } from "react";
import { userColumns } from "./userColumns";
import PageLoader from "../../components/Loading/PageLoader";
import FilterMenu from "../../components/Filter/FilterMenu";
import UserFilter from "../../components/Filter/UserFilter";

const UsersPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {
        data,
        isLoading,
        currentPage,
        totalPages,
        fetchDataHandler,
        limit,
        page
    } = useFetch<any>({
        url: api.admin.users,
        pageNo: 1,
        pageLimit: 5,
        queryName: "usersData"
    });

    const columns = useMemo(() => userColumns, []);

    return (
        <>
            {isLoading && <PageLoader />}
            <TableCard fetchDataHandler={fetchDataHandler} filtersComponent={
                <FilterMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
                    <UserFilter setMenuOpen={setMenuOpen} fetchDataHandler={fetchDataHandler} limit={limit} />
                </FilterMenu>
            }>
                <ReactTable columns={columns} data={data} isActions={true}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} page={page} limit={limit} handlePageChange={fetchDataHandler} />
                </ReactTable>
            </TableCard>
        </>
    )
}
export default UsersPage;