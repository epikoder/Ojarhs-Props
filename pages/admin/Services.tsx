import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import NewService from "../../components/NewService";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { Api } from "../../helpers/api";
import { GetStaticProps } from "next";


function Services() {
	const [open, setOpen] = useState<Boolean>(false);
	const [updateOpen, setUpdateOpen] = useState<Boolean>(false);

	(async () => {
		const { data, status } = await Api().get("/admin/services/all")
		console.log(data.data);


	})();


	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					<div className='flex justify-between items-center shadow-gray-200 shadow-md px-2'>
						<h1 className='lg:text-3xl text-md red'>All Service</h1>

						<button
							type='button'
							className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
							onClick={() => setOpen(true)}
						>
							Add new
						</button>
					</div>
					{open ? (
						<div className='w-full relative '>
							<NewService type='new' setOpen={setOpen} />
						</div>
					) : (
						""
					)}
					{updateOpen ? (
						<div className='w-full relative'>
							{" "}
							<NewService type='update' setOpen={setUpdateOpen} />{" "}
						</div>
					) : (
						""
					)}

					{[1].length !== 0 ? (
						<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
							<table id='customers'>
								<tr className='he w-full flex justi'>
									<th className='inline-block w-[30%] text-left'>Name</th>
									<th className='hidden lg:inline-block w-[30%] text-left '>
										Plan
									</th>
									<th className='inline-block w-[20%] text-left'>Fee</th>
									<th className='hidden lg:inline-block w-[20%] text-left'>
										Options
									</th>
									<th className='lg:hidden'></th>
								</tr>
							</table>
						</div>
					) : (
						<div className='text-center uppercase mt-4 '>No New Service </div>
					)}
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}

export default Services;