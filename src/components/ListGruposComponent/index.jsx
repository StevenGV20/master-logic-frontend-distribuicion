import React from "react";
import { GRUPOS_COLS_MODAL_DESKTOP } from "../../utils/general";

const ListGruposComponent = ({grupos}) => {
  return (
    <div>
      <TableMUICustomComponent cols={GRUPOS_COLS_MODAL_DESKTOP}>
        {grupos.map((grupo) => (
          <>
            <TableRow>
              <TableCell component="th" scope="row">
                {grupo.name}
              </TableCell>
              <TableCell align="center">{grupo.sede}</TableCell>
              <TableCell align="center">{grupo.volumenTotal}</TableCell>
              <TableCell align="center">{grupo.montoTotal}</TableCell>
            </TableRow>
          </>
        ))}
      </TableMUICustomComponent>
    </div>
  );
};

export default ListGruposComponent;
