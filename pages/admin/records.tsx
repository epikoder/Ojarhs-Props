import React from "react";
import DashCards from "../../components/DashCards";
import RecordCharts from "../../components/RecordCharts";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { House } from "@mui/icons-material";

function Records() {
	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					<div className='grid md:grid-cols-2 grid-cols-1 gap-5 justify-center my-2'>
						<DashCards
							name='total properties'
							value={70}
							className='yoda'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
						<DashCards
							name='total Tenants'
							value={70}
							className='wiretap'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
						<DashCards
							name='total Staffs'
							value={70}
							className='red-sunset'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
						<DashCards
							name='Rents paid'
							value={70}
							className='gradlegray'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
						<DashCards
							name='printing jobs'
							value={70}
							className='vanusa'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
						<DashCards
							name='Receipts'
							value={70}
							className='taran-tado'
							endIcon={<House fontSize="large" className="text-white" />}
						/>
					</div>
					<div className='grid gap-12 grid-cols-1 md:grid-cols-2 pb-8'>
						<RecordCharts
							values={[50, 40, 110]}
							option={{
								title: {
									text: 'Adverts',
									style: {
										fontSize: '18px'
									}
								},
								labels: ['Active', 'Approved', 'Unapproved'],
							}}
						/>
						<RecordCharts
							values={[50, 40]}
							option={{
								title: {
									text: 'Shops',
									style: {
										fontSize: '18px'
									}
								},
								labels: ['Active', 'Free'],
							}}
						/>
						<RecordCharts
							values={[50, 40]}
							option={{
								title: {
									text: 'Warehouse',
									style: {
										fontSize: '18px'
									}
								},
								labels: ['Active', 'Free'],
							}}
						/>
						<RecordCharts
							values={[50, 40]}
							option={{
								title: {
									text: 'Offices',
									style: {
										fontSize: '18px'
									}
								},
								labels: ['Active', 'Free'],
							}}
						/>
					</div>
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}

export default Records;
