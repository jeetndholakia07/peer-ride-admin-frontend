import { type FC } from "react";
import { deleteToken } from "../../IndexedDB/tokens.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type UserProps = {
    userMenuRef: any;
    showUserMenu: any;
    setShowUserMenu: any;
}

const UserAccount: FC<UserProps> = ({ userMenuRef, setShowUserMenu, showUserMenu }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleLogout = async () => {
        await deleteToken();
        navigate("/login");
    };
    return (
        <div className="relative" ref={userMenuRef}>
            <button
                className="text-xl hover:cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2 transition-colors duration-200 rounded"
                style={{ background: "none", border: "none" }}
                aria-label="Account"
                onClick={() => setShowUserMenu(!showUserMenu)}
            >
                <i className="bi bi-person-fill text-2xl hover:cursor-pointer" />
            </button>
            {showUserMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                    <ul className="py-1 text-sm text-gray-700">
                        <li>
                            <button className="w-full hover:cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                                onClick={handleLogout}>
                                {t("logout")}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
export default UserAccount;