import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import Filter from "./Filter";
import { driverStatus, rideStatus } from "../../i18n/keys/rideFilter.json";

type Props = {
    limit: number;
    fetchDataHandler: (pageNo: number, pageLimit: number, filters?: Record<string, string | undefined>, search?: string) => void;
    setMenuOpen: any;
};

const RideFilter: FC<Props> = ({ limit, fetchDataHandler, setMenuOpen }) => {
    const [filters, setFilters] = useState<Record<string, any>>({
        driverStatus: "",
        driveStatus: "",
    });

    const { t } = useTranslation();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, filterType: string) => {
        const { value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value === "" ? "" : value,
        }));
    };

    const handleResetFilter = () => {
        setFilters({ driverStatus: "", driveStatus: "" });
        fetchDataHandler(1, limit, {});
        setMenuOpen(false);
    };

    const handleApplyFilter = () => {
        fetchDataHandler(1, limit, filters);
        setMenuOpen(false);
    };

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t("filterOptions")}</h3>
                <button
                    onClick={handleResetFilter}
                    className="text-sm text-blue-600 hover:underline font-medium hover:cursor-pointer"
                >
                    {t("resetBtn")}
                </button>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-100 mb-5"></div>
            {/* Verified Filter */}
            <div className="mb-5">
                <Filter
                    label={t("rideStatus")}
                    name="rideStatus"
                    value={filters.rideStatus || ""}
                    onChange={(e) => handleFilterChange(e, "rideStatus")}
                    values={rideStatus}
                />
            </div>
            {/* Role Filter */}
            <div className="mb-5">
                <Filter
                    label={t("driverStatus")}
                    name="driverStatus"
                    value={filters.driverStatus || ""}
                    onChange={(e) => handleFilterChange(e, "driverStatus")}
                    values={driverStatus}
                />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 border-t pt-4 border-gray-100">
                <button
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium
                                 hover:bg-gray-100 transition hover:cursor-pointer"
                >
                    {t("cancel")}
                </button>
                <button
                    onClick={handleApplyFilter}
                    className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 
                                transition hover:cursor-pointer"
                >
                    {t("applyBtn")}
                </button>
            </div>
        </>
    );
};

export default RideFilter;