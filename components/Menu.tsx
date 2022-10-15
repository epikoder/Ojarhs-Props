import { Button, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { ReactNode } from "react";

export const KMenu = ({ button, menu, className }: {
    button: JSX.Element
    menu?: ReactNode
    className?: string
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
                className={className}
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
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{ color: 'transparent' }}
            >
                {Array(menu).length !== 0 && Array(menu).map((m, i) => m)}
            </Menu>
        </div>
    );
}