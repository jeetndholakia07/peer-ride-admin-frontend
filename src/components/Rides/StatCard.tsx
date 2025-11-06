import type { FC } from "react";

type StatCardProps = {
    title: string;
    value: number | string;
    icon: string;
};

const StatCard: FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
        <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
            <i className={`bi ${icon} text-2xl`}></i>
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
            <p className="text-gray-900 text-3xl font-bold">{value}</p>
        </div>
    </div>
);
export default StatCard;