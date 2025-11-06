import SideBar from "../../components/Navbar/index.js";
import Header from "../../components/Header/index.js";
import { Outlet } from "react-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const Index = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 max-w-full">
            {/* Sidebar */}
            <div className="flex-shrink-0 h-full">
                <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Mobile topbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shadow-md md:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-[#343C6A] font-bold text-2xl focus:outline-none"
                        aria-label="Open menu"
                    >
                        <i className="bi bi-list"></i>
                        <span className="font-bold text-[#343C6A] text-xl ml-5">{t("peerRide")}</span>
                    </button>
                </div>

                {/* Desktop header */}
                <Header />

                {/* Scrollable main content */}
                <main className="flex-1 overflow-y-auto px-4 pt-6 md:px-6 md:pt-6 pb-0 max-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default Index;