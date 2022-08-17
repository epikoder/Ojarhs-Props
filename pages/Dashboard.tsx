import React, { useState } from 'react'
import SideBar from "../components/SideBar";
import SideBarHeader from "../components/SideBarHeader";
import Tenant from "../components/Tenant";
import { TenantsDetails } from "../Data";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../features/ToggleSideBar";
import Link from "next/link";
import NewTenant from "../components/NewTenant";
import { tenantsList } from "../features/TenantsSlice";


function Dashboard() {

  const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);	
	const sideBarState = useSelector(SideBarToggleState);
	const tenantListArr = useSelector(tenantsList)

  const test = async () => {
    console.log("started");
    try {
        const res = await fetch("https://prep50.herokuapp.com/admin", {
            method: "POST",
            body: JSON.stringify({
                "username": "epikoder",
                "password": "password"
            })
        })
        console.log(res);

        console.log(await res.json());
    } catch (error) {
        console.log(error);
    }
}
test()

  return (
    <div className='w-full'>
    <div className=''>
      <SideBarHeader />
    </div>
    <div className='flex fixed top-16 w-full'>
      <div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
        <SideBar />
      </div>

      <h1 className='mt-4 text-2xl'>Dashboard</h1>

    </div>

    </div>
  )
}

export default Dashboard