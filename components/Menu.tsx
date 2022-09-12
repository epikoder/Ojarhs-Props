import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

export const KMenu = ({ button, menu = [] }: {
    button: JSX.Element
    menu?: JSX.Element[] | string[]
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'black'
                }}
            >
                {button}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{ color: 'transparent' }}
            >
                {menu.length !== 0 && menu.map((m, i) => <div key={i} onClick={handleClose}>
                    <MenuItem dense >
                        {m}
                    </MenuItem>
                </div>)}
            </Menu>
        </div>
    );
}