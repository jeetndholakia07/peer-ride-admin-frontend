import { useTranslation } from "react-i18next";
import { useState, type FC } from "react";
import { useSelector } from 'react-redux';
import { type RootState } from "../../context/store/store.js";

type searchProps = {
    fetchDataHandler: (pageNo: number, pageLimit: number,
        filters?: Record<string, string | undefined>, search?: string) => void;
}

const SearchButton: FC<searchProps> = ({ fetchDataHandler }) => {
    const { t } = useTranslation();
    const { pageNo, pageLimit } = useSelector((state: RootState) => state.paginationState);
    const [search, setSearch] = useState("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setIsTyping(value.length > 0);
    };

    const handleSearch = () => {
        fetchDataHandler(pageNo, pageLimit, undefined, search);
    }

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setSearch("");
        setIsTyping(false);
        fetchDataHandler(pageNo, pageLimit, undefined, undefined);
    };

    return (
        <div className="w-full md:w-auto ml-4">
            <div className="flex items-center">
                <div className="relative">
                    <input
                        id="search"
                        type="text"
                        placeholder={t("search")}
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleEnterKey}
                        className="h-10 w-full px-4 border focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 rounded-l-md text-sm"
                    />
                    {isTyping && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute hover:cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black text-xs"
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    className={`h-10 px-4 hover:cursor-pointer border border-gray-300 border-l-0 rounded-r-md
        bg-blue-600 hover:bg-blue-700 focus:outline-none`}
                    onClick={handleSearch}
                >
                    <i className="bi bi-search text-white text-base" />
                </button>

            </div>
        </div>
    )
}
export default SearchButton;