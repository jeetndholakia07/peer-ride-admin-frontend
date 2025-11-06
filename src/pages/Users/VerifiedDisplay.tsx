import { type FC } from "react";

type Props = {
  isVerified: boolean;
};

const VerifiedDisplay: FC<Props> = ({ isVerified }) => {
  return (
    <span
      className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
        isVerified
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white" 
      }`}
    >
      {isVerified ? "Verified" : "Unverified"}
    </span>
  );
};

export default VerifiedDisplay;
