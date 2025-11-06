import { useEffect, type FC, useRef } from "react";

type overlayProps = {
    imageUrl: string;
    alt: string;
    onClose: () => void;
}

const ImageOverlay: FC<overlayProps> = ({ imageUrl, onClose, alt }) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                onClose();  // Close the overlay
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div
                ref={overlayRef}
                className="relative p-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >

                {/* Image */}
                <img src={imageUrl} alt={alt} className="w-full h-full object-contain rounded-lg" />
            </div>
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 hover:cursor-pointer right-4 text-white text-3xl hover:bg-gray-700 rounded-full p-2"
            >
                <i className="bi bi-x" />
            </button>
        </div>
    )
};

export default ImageOverlay;
