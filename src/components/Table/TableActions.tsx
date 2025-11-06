import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, type FC } from "react";
import { useToast } from "../../components/Toast/ToastContext.js";
import ConfirmModal from "../Modal/ConfirmModal.js";
import apiInterceptor from "../../hooks/apiInterceptor.js";
import { api } from "../../hooks/api.js";
import useInvalidateQuery from "../../hooks/useInvalidateQuery.js";

type actionProps = {
    row: any;
}

const TableActions: FC<actionProps> = ({ row }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const baseItemClass = "flex items-center hover:cursor-pointer w-full px-4 py-2 text-sm transition-colors duration-150";
    const iconClass = "text-lg";
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const invalidateQuery = useInvalidateQuery();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleConfirmVerify = () => {
        if (!row.isVerified) {
            setMenuOpen(false);
            setModalOpen(true);
        }
    };

    const handleVerify = async () => {
        try {
            const userId = row.id;
            await apiInterceptor.put(api.admin.verifyUser, { userId });
            handleClose();
            showToast("success", t("messages.verifySuccess"));
            invalidateQuery(["usersData"]);
        } catch (err) {
            showToast("error", t("error.server"));
        }
    };

    return (
        <>
            <div className="p-0 relative menu-button" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-500 px-3 py-2 rounded hover:cursor-pointer hover:text-gray-600 transition"
                    title="Options"
                >
                    <i className="bi bi-three-dots-vertical text-2xl" />
                </button>
                {menuOpen && (
                    <div className="absolute right-0 top-0 w-52 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden">
                        <ul className="text-gray-700">
                            <li>
                                <button
                                    className={`${baseItemClass} hover:bg-green-50 text-nowrap text-green-700`}
                                    disabled={row.isVerified}
                                    onClick={handleConfirmVerify}
                                >
                                    <i className={`bi bi-check-lg ${iconClass} mr-2 text-green-600`} />
                                    {t("verify")}
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {modalOpen && <ConfirmModal open={modalOpen} confirmBtn={t("verify")} closeModal={handleClose}
                title={t("confirm")} message={t("confirmVerify")} handleCancel={handleClose}
                handleSubmit={handleVerify} bgColor="bg-green-600 hover:bg-green-700" />}
        </>
    );
};

export default TableActions;