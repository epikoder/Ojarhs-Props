import React, { useState } from 'react'
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import NewService from '../../components/NewService';
import { ServiceList } from '../../features/ServiceSlice';
import Service from '../../components/Services';



function Services() {
	const sideBarState = useSelector(SideBarToggleState);	
  const serviceArr = useSelector(ServiceList)
  const [open, setOpen] = useState<Boolean>(false)
  const [updateOpen, setUpdateOpen] = useState<Boolean>(false)


  return (
    <div className='w-full'>
    <div className=''>
      <SideBarHeader />
    </div>
    <div className='flex fixed top-16 w-full'>
      <div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
        <SideBar />
      </div>

      <div className='w-full h-[90vh] overflow-scroll pb-24'>
					<div className='flex justify-between  w-full items-center shadow-gray-200 shadow-md px-2 mt-2'>
						<h1 className='lg:text-3xl text-md red'>All Service</h1>

						<button
							type='button'
							className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
							onClick={() => setOpen(true)}
						>
							Add new
						</button>
					</div>
					{open ? <NewService type='new' setOpen={setOpen} /> : ""}
					{updateOpen ? <NewService type='update' setOpen={setUpdateOpen} /> : ""}

					{serviceArr.length !== 0 ? (
						<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
							<table id='customers'>
								<tr className='he w-full flex justi'>
									<th className='inline-block w-[30%] text-left'>Title</th>
									<th className='hidden lg:inline-block w-[30%] text-left '>Duration</th>
									<th className='inline-block w-[20%] text-left'>Fee</th>
									<th className='hidden lg:inline-block w-[20%] text-left'>Options</th>
									<th className='lg:hidden'></th>
								</tr>

								{serviceArr.map((service, index) => {
									return (
										<Service Service={service} key={index} setOpen={setUpdateOpen} />
									);
								})}
							</table>
						</div>
					) : (
						<div className='text-center uppercase mt-4 '>No New Service </div>
					)}
				</div>

    </div>

    </div>
  )
}

export default Services