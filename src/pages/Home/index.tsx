import { useQuery } from "@tanstack/react-query";
import StatCard from "../../components/Rides/StatCard";
import { api } from "../../hooks/api";
import apiInterceptor from "../../hooks/apiInterceptor";
import PageLoader from "../../components/Loading/PageLoader";

const HomePage = () => {
    const fetchDashboard = async () => {
        try {
            const response = await apiInterceptor.get(api.admin.dashboardMaster);
            return response.data;
        } catch (err) {
            console.error("Error fetching dashboard stats:", err);
            return null;
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ["dashboardMaster"],
        queryFn: fetchDashboard,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <PageLoader />;
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={data?.totalUsers} icon="bi-people-fill" />
                <StatCard title="Total Rides" value={data?.totalRides} icon="bi-car-front-fill" />
                <StatCard title="Completed Rides" value={data?.completedRides} icon="bi-check-circle-fill" />
                <StatCard title="Live (Pending) Rides" value={data?.liveRides} icon="bi-broadcast" />
                <StatCard title="Cancelled Rides" value={data?.cancelledRides} icon="bi-x-circle-fill" />
            </div>
        </div>
    )
}
export default HomePage;