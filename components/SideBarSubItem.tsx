import { Button } from "@mui/material";
import React from "react";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useAppDispatch } from "../store";
import NavLink from "./NavLink";

function SideBarSubItem({ subItem, toggle, mobile }: { subItem: { name: string, link: string }[], toggle: boolean, mobile?: boolean }) {
	const dispatch = useAppDispatch()
	return (
		<div>
			{subItem.map((item, index) => {
				return (
					<div hidden={!toggle} className="ml-4" key={index}>
						<NavLink key={index} href={item.link}>
							<Button
								fullWidth
								size='small'
								className={`text-left text-sm ${toggle ? '' : 'hidden'}`}
								onClick={() => mobile === true ? dispatch(toggleSideBar()) : null}
							>
								<div className="text-left text-sec w-full p-2">
									{`- ${item.name}`}
								</div>
							</Button>
						</NavLink>
					</div>
				);
			})}
		</div>
	)
}

export default SideBarSubItem;
