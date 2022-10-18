import { Button, Menu } from "@mui/material";
import { cloneElement, MouseEvent, useState } from "react";
import { ReactNode } from "react";

export const KMenu = ({ button, menu, className, overrideButton }: {
    button: JSX.Element
    menu?: ReactNode
    className?: string
    overrideButton?: boolean
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
            {
                !overrideButton && <Button
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
            }
            {
                overrideButton && cloneElement(button, {
                    id: "basic-button",
                    'aria-controls': open ? 'basic-menu' : undefined,
                    'aria-haspopup': "true",
                    'aria-expanded': open ? 'true' : undefined,
                    onClick: button.props?.onClick ? (e: MouseEvent<HTMLButtonElement>) => {
                        button?.props?.onClick()
                        handleClick(e)
                    } : handleClick,
                    className: className
                })
            }
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