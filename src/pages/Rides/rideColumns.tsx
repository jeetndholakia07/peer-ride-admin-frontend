import RideRequest from "../../components/Rides/RideRequest";
import StatusDisplay from "../../components/Rides/StatusDisplay";
import { formatDateTime } from "../../utils/dateFormat";

export const rideColumns = [
    {
        header: "Ride Status",
        cell: ({ row }: any) => {
            return <StatusDisplay status={row.original.drive.driveStatus} />
        }
    },
    {
        header: "Ride",
        accessorFn: (row: any) => `${row.drive.from} - ${row.drive.to}`
    },
    {
        header: "Departure Time",
        cell: ({ row }: any) => {
            const dateTime = row.original.drive.departureTime;
            return <span>{formatDateTime(dateTime)}</span>
        }
    },
    {
        header: "Driver Name",
        accessorFn: (row: any) => row.drive.driver.username
    },
    {
        header: "Seats Left",
        accessorFn: (row: any) => row.drive.seatsAvailable
    },
    {
        header: "Price per Head",
        accessorFn: (row: any) => row.drive.pricePerPerson
    },
    {
        header: "Vehicle Type",
        accessorFn: (row: any) => row.drive.vehicleDetails.vehicleType
    },
    {
        header: "Vehicle Name",
        accessorFn: (row: any) => row.drive.vehicleDetails.vehicleName
    },
    {
        header: "Ride Requests",
        cell: ({ row }: any) => {
            return <RideRequest rideRequests={row.original.rideRequests} />
        }
    }
]