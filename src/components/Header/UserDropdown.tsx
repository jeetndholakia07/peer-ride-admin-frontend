import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { getUserContext } from "../../context/UserContext";
import MenuItem from "./MenuItem";

const UserDropdown = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);
    const dropdownRef = useRef(null);
    const { setUser, hasValidatedRef, user } = getUserContext();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current as any).contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const res = await apiInterceptor.post(api.auth.logout);
            if (res.data.success) {
                setUser(null);
                hasValidatedRef.current = false;
                navigate("/login");
            }
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-1 focus:outline-none hover:cursor-pointer"
                aria-label="Toggle user menu"
            >
                <div className="relative w-[2.5rem] h-[2.5rem]">
                    <span className="absolute inset-0 rounded-full border-2 font-bold border-blue-400 animate-pulse"></span>
                    <img
                        src={"/assets/images/account.png"}
                        alt={t("adminProfile")}
                        className="w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer relative z-10"
                    />
                </div>
                <i className={`bi bi-chevron-${open ? 'up' : 'down'} text-gray-500 text-sm`} />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                    <div className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                            <i className="bi bi-person-circle text-blue-500 text-lg" />
                            <div className="text-sm text-gray-700 font-medium">
                                {t("welcome")}, <span className="font-semibold text-gray-900">{user?.username}</span>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <MenuItem icon="bi bi-box-arrow-right" label={t("logout")} isLogout={true} onClick={() => handleLogout()} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserDropdown;