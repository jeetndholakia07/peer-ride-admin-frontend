import { useEffect, useRef, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../hooks/useMediaQuery.js";

type FilterMenuProps = {
  children: ReactNode;
  isCalendarOpen?: boolean;
  menuOpen: boolean;
  setMenuOpen: any;
};

const FilterMenu: FC<FilterMenuProps> = ({
  children,
  isCalendarOpen = false,
  menuOpen,
  setMenuOpen,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 767px)");

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if ((target as HTMLElement).closest(".flatpickr-calendar")) return;
      if (!isCalendarOpen) setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setMenuOpen((prev:any) => !prev)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white 
          px-4 py-2 rounded-lg shadow-sm transition-all font-semibold hover:cursor-pointer"
      >
        <i className="bi bi-funnel-fill text-lg"></i>
        {t("filter")}
      </button>

      {menuOpen && (
        <>
          {/* Mobile Overlay */}
          {!isDesktop && (
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Filter Panel */}
          <div
            ref={menuRef}
            className={`z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-6
              ${!isDesktop
                ? "fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-h-[80vh] overflow-y-auto rounded-t-2xl"
                : "absolute right-0 mt-2 w-96 max-h-[50vh] overflow-y-auto"
              }`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterMenu;
