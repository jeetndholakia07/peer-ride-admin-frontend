import type { FC } from "react";

type Props = {
    profileImg: string;
    alt: string;
};

const ImageDisplay: FC<Props> = ({ profileImg, alt }) => {
    return (
        <img
            src={profileImg}
            alt={alt}
            className={`w-10 h-10 rounded-full cursor-pointer object-cover`} 
        />
    );
};

export default ImageDisplay;
