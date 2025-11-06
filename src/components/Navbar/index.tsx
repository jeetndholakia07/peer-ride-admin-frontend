import NavItem from "./NavItem.js";
import { useRef, useEffect, type FC } from "react";

type SidebarProps = {
    isOpen: boolean;
    onClose: any;
}

const Index: FC<SidebarProps> = ({ isOpen, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current?.contains(event.target as Node)) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Overlay on mobile when sidebar is open */}
            <div
                className={`fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose} ref={sidebarRef}
            />
            <aside className={`w-64 bg-white shadow-md h-screen fixed z-40 top-0 left-0 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}>
                <div className="flex items-center space-x-3 px-4 py-5 border-b border-white/20">
                    {/* Logo */}
                        <img className="h-[5rem]" loading="lazy" alt="Logo" src="/assets/images/Logo.png" />
                </div>

                {/* Navigation Links */}
                <nav className="px-2 pt-3 space-y-3 font-medium">
                    <NavItem name="Home" icon={<i className="bi bi-house-door-fill" />} path="/" />
                    <NavItem name="Rides" icon={<i className="bi-car-front-fill" />} path="/rides" />
                    <NavItem name="Users" icon={<i className="bi-people-fill" />} path="/users" />
                    <NavItem name="Frequent Rides" icon={<i className="bi-broadcast" />} path="/frequent-rides" />
                </nav>
            </aside>
        </>
    )
}
export default Index;