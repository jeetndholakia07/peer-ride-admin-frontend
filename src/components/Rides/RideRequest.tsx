import React from "react";

type RideRequestProps = {
    rideRequests: any;
};

const RideRequest: React.FC<RideRequestProps> = ({ rideRequests }) => {
    if (!rideRequests || rideRequests.length === 0) {
        return <span>-</span>;
    }

    return (
        <div>
            {rideRequests.map((request: any, index: any) => (
                <span key={index}>
                    {request.passenger.username}
                    {index < rideRequests.length - 1 && ", "}
                </span>
            ))}
        </div>
    );
};

export default RideRequest;