import { useState, type FC } from "react";
import ImageOverlay from "../../components/Profile/ImageOverlay";

type props = {
    collegeIDProof: any;
    username:string;
}

const CollegeID: FC<props> = ({ collegeIDProof, username }) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleClose = () => {
        setIsOverlayVisible(false);
    };

    const handleOpen = () => {
        setIsOverlayVisible(true);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="p-2 bg-transparent hover:cursor-pointer hover:font-bold rounded text-blue-600 hover:text-blue-800 transition"
            >
                View
            </button>
            {isOverlayVisible && <ImageOverlay imageUrl={collegeIDProof} onClose={handleClose} alt={username}/>}
        </>
    )
}
export default CollegeID;