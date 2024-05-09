import { MenuItem, Pagination, Select, Stack } from "@mui/material";
import React, { useState } from "react";

const PaginationCustom = ({ data,children }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    //findOrdenesDespacho(value, limit);
  };
  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    //findOrdenesDespacho(page, e.target.value);
  };

  return (
    <div>
      <div className="flex space-x-4 place-items-center">
        <div>Mostrar:</div>
        <Select
          value={limit}
          id="demo-select-small"
          onChange={(e) => handleChangeLimit(e)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>
      {children}
      <div className="w-full flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={data && Math.ceil(data.length / limit)}
            color="primary"
            showFirstButton
            showLastButton
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default PaginationCustom;
