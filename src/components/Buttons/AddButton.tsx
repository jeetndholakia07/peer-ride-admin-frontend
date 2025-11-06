import { type FC } from "react";

type props = {
    handleAdd: () => void;
    name: string;
}

const AddButton: FC<props> = ({ handleAdd, name }) => {
    return (
        <button type="button" className="px-4 py-3 text-sm font-medium text-white rounded-lg hover:cursor-pointer
        bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleAdd}>
            <i className="bi bi-plus-circle-fill text-sm text-white mr-2" />
            {name}
        </button>
    )
}
export default AddButton;