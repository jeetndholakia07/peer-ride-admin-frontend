import ImageDisplay from "../../components/Profile/ImageDisplay";
import CollegeID from "./CollegeID";
import VerifiedDisplay from "./VerifiedDisplay";

export const userColumns = [
    {
        header: "User",
        cell: ({ row }: any) => {
            const { username, profileImg } = row.original;
            return <ImageDisplay profileImg={profileImg} alt={username} />;
        },
    },
    {
        header: "Username",
        accessorFn: (row: any) => row.username,
    },
    {
        header: "Role",
        accessorFn: (row: any) => row.role,
    },
    {
        header: "CollegeID",
        cell: ({ row }: any) => {
            const { role, collegeIDProof, username } = row.original;
            if (role === "driver") {
                return <span className="relative left-5 font-bold">-</span>
            }
            else {
                return <CollegeID collegeIDProof={collegeIDProof} username={username} />
            }
        }
    },
    {
        header: "Verified",
        cell: ({ row }: any) => {
            const isVerified = row.original.isVerified;
            return <VerifiedDisplay isVerified={isVerified} />
        }
    },
];
