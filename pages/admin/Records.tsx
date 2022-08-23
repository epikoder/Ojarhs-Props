import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";

function Records() {
    const sideBarState = useSelector(SideBarToggleState );
	return (
		<div className='w-full'>
			<div className=''>
				<SideBarHeader />
			</div>
			<div className='flex fixed top-16 w-full'>
				<div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
					<SideBar />
				</div>

                <div className="w-full h-[100vh] overflow-scroll mt-8">
                    Records
                </div>
			</div>
		</div>
	);
}

export default Records;
