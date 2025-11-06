import { type FC } from "react";
import { getStatusColor, getStatusIcon } from "../../utils/rideFormat";

type props = {
    status: string;
}

const StatusDisplay: FC<props> = ({ status }) => {
    const color = getStatusColor(status);
    return (
        <span
            className={`px-3 py-1 font-bold uppercase rounded-full ${color}`}
        >
            {getStatusIcon(status)}{status}
        </span>
    )
}
export default StatusDisplay;