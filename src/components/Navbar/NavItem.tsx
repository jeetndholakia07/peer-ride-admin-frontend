import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavItemProps = {
    name: string;
    path: string;
    icon: any;
}

const NavItem: FC<NavItemProps> = ({ name, path, icon }) => {
    const location = useLocation().pathname;
    const isActive = location === path;

    return (
        <NavLink
            to={path}
            className={`flex items-center px-3 py-2 rounded transition 
                ${isActive ? "border-l-4 border-blue-700 " : "text-gray-700 hover:bg-gray-100"}`}
        >
            <span className={`mr-3 ${isActive ? " text-blue-700 " : "text-gray-700 hover:bg-gray-100"}`}>
                {icon}
            </span>
            <span className={`${isActive ? " text-blue-700 " : "text-gray-700 hover:bg-gray-100"}`}>{name}</span>
        </NavLink>
    );
}

export default NavItem;
