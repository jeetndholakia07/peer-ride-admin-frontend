import UserDropdown from "./UserDropdown";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
    return (
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow">
            <h1 className="text-xl font-black text-[#343C6A]">{t("peerRide")} {t("admin")}</h1>
            <div className="flex items-center space-x-2">
                <UserDropdown />
            </div>
        </header>
    );
};

export default Index;
