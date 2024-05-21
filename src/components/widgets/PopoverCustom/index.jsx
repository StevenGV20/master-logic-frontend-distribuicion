import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Popover } from "@mui/material";
import React from "react";

export default function BasicPopover({ children }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div>
        <button onClick={handleClick}>
          <MoreVertIcon />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{zIndex:"10"}}
        >
          <div className="p-2 w-full">{children}</div>
        </Popover>
      </div>
    );
  }