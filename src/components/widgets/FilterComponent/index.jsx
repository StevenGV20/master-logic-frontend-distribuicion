import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SlideOverComponent from "../SlideOverComponent";

const FilterComponent = ({ title, children, showBtnFilter = true }) => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="w-1/6 lg:w-1/12 text-center content-center grid justify-items-center">
      {showBtnFilter && (
        <div className="w-5 ml-4">
          <button onClick={() => setOpenFilter(true)}>
            <FilterAltIcon />
          </button>
        </div>
      )}
      <SlideOverComponent
        open={openFilter}
        setOpen={setOpenFilter}
        title={title}
      >
        {children}
      </SlideOverComponent>
    </div>
  );
};

export default FilterComponent;
