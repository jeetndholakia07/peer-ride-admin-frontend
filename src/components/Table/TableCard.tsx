import { type FC, type ReactNode } from "react";
import SearchButton from "./SearchButton";
import { Card, CardContent } from "@mui/material";
import useMediaQuery from "../../hooks/useMediaQuery";
import AddButton from "../Buttons/AddButton";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

type CardProps = {
  children?: React.ReactNode;
  isAdd?: boolean;
  isFilter?: boolean;
  fetchDataHandler: (pageNo: number, pageLimit: number,
    filters?: Record<string, string | undefined>) => void;
  filtersComponent?: ReactNode;
};

const TableCard: FC<CardProps> = ({ children, isFilter = true, fetchDataHandler, filtersComponent, isAdd = false }) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onAdd = () => {
    navigate("/add-frequent-ride");
  };
  return (
    <Card className="bg-white rounded-lg shadow p-4 md:p-6 space-y-4 w-full">
      {matches && (
        <div className="flex-col items-center justify-center w-full">
          <SearchButton fetchDataHandler={fetchDataHandler} />
          <div className="ml-5 mt-4 flex items-center space-x-5 justify-start">
            {isFilter && filtersComponent}
            {isAdd && <AddButton handleAdd={onAdd} name={t("add")} />}
          </div>
        </div>
      )}
      {!matches && (
        <div className="flex items-center justify-between w-full">
          <SearchButton fetchDataHandler={fetchDataHandler} />
          <div className="flex items-center space-x-8 justify-between">
            {isFilter && filtersComponent}
            {isAdd && <AddButton handleAdd={onAdd} name={t("add")} />}
          </div>
        </div>
      )}
      <CardContent className="w-auto py-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default TableCard;
