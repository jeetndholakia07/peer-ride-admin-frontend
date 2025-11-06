import { useState, useRef, useEffect } from "react";
import UserAccount from "./UserAccount";
import { useTranslation } from "react-i18next";

const Index = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);
    const { t } = useTranslation();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !(userMenuRef.current as any).contains(event.target)
            ) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow">
            <h1 className="text-xl font-black text-[#343C6A]">{t("peerRide")} {t("admin")}</h1>
            <div className="flex items-center space-x-2">
                <UserAccount userMenuRef={userMenuRef} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
            </div>
        </header>
    );
};

export default Index;
