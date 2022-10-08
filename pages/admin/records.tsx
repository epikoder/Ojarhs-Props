import React from "react";
import DashCards from "../../components/DashCards";
import RecordCharts from "../../components/RecordCharts";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { House, Money, Person, Person2, Print, Receipt } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import Loader from "../../components/Loader";
import { loadRecord } from "../../actions/admin/record";
import { money, resolveFilePath } from "../../helpers/helpers";
import { Api } from "../../helpers/api";

function Records() {
	const { data, state } = useSelector((store: RootState) => store.recordSlice)
	const dispatch = useAppDispatch()
	const [totalProperties, settotalProperties] = React.useState<number>(0)

	React.useEffect(() => {
		dispatch(loadRecord())
	}, [])

	React.useEffect(() => {
		if (state === 'success') {
			let a = 0
			Object.keys(data.space).forEach(k => {
				a += data.space[k].total
			})
			settotalProperties(a)
		}
	}, [data])

	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					{state === 'pending' && <Loader />}

					{state !== 'pending' &&
						<div>
							<div className='grid md:grid-cols-2 grid-cols-1 gap-2 justify-center my-2'>
								<DashCards
									name='total properties'
									value={totalProperties}
									className='yoda'
									endIcon={<House fontSize="large" className="text-white" />}
									exportFunc={async (): Promise<boolean> => {
										try {
											const { data } = await Api().get('/admin/records/properties')
											const a = document.createElement('a')
											a.href = resolveFilePath(data.data)
											a.download = (data.data as string).split('/').pop()
											a.id = 'download-file'
											a.click()
											return true
										} catch (error) {
											console.log(error)
										}
										return false
									}}
								/>
								<DashCards
									name='total Tenants'
									value={data.tenant}
									className='wiretap'
									endIcon={<Person fontSize="large" className="text-white" />}
									exportFunc={async (): Promise<boolean> => {
										try {
											const { data } = await Api().get('/admin/records/tenants')
											const a = document.createElement('a')
											a.href = resolveFilePath(data.data)
											a.download = (data.data as string).split('/').pop()
											a.id = 'download-file'
											a.click()
											return true
										} catch (error) {
											console.log(error)
										}
										return false
									}}
								/>
								<DashCards
									name='total Staffs'
									value={data.staff}
									className='red-sunset'
									endIcon={<Person2 fontSize="large" className="text-white" />}
									exportFunc={async (): Promise<boolean> => {
										try {
											const { data } = await Api().get('/admin/records/staffs')
											const a = document.createElement('a')
											a.href = resolveFilePath(data.data)
											a.download = (data.data as string).split('/').pop()
											a.id = 'download-file'
											a.click()
											return true
										} catch (error) {
											console.log(error)
										}
										return false
									}}
								/>
								<DashCards
									name={`Total Rent Paid - ${data.rent.total}`}
									value={money(data.rent.amount)}
									className='gradlegray'
									endIcon={<Money fontSize="large" className="text-white" />}
									exportFunc={async (): Promise<boolean> => {
										try {
											const { data } = await Api().get('/admin/records/rents')
											const a = document.createElement('a')
											a.href = resolveFilePath(data.data)
											a.download = (data.data as string).split('/').pop()
											a.id = 'download-file'
											a.click()
											return true
										} catch (error) {
											console.log(error)
										}
										return false
									}}
								/>
								<DashCards
									name='printing jobs'
									value={data.invoice}
									className='vanusa'
									endIcon={<Print fontSize="large" className="text-white" />}
									exportFunc={async (): Promise<boolean> => {
										try {
											const { data } = await Api().get('/admin/records/invoices')
											const a = document.createElement('a')
											a.href = resolveFilePath(data.data)
											a.download = (data.data as string).split('/').pop()
											a.id = 'download-file'
											a.click()
											return true
										} catch (error) {
											console.log(error)
										}
										return false
									}}
								/>
								<DashCards
									name='Receipts'
									value={data.receipt}
									className='taran-tado'
									endIcon={<Receipt fontSize="large" className="text-white" />}
								/>
							</div>
							<div className='grid gap-4 grid-cols-1 md:grid-cols-2 pb-8'>
								<RecordCharts
									values={[data.advert.active, data.advert.approved, data.advert.unapproved]}
									option={{
										title: {
											text: `${'Advert'.toUpperCase()} - Total: ${data.advert.total}`,
											style: {
												fontSize: '16px'
											}
										},
										labels: ['Active', 'Approved', 'Unapproved'],
									}}
								/>

								{
									Object.keys(data.space).map(k =>
										<RecordCharts
											key={k}
											values={[data.space[k].open, data.space[k].occupied]}
											option={{
												title: {
													text: `${k.toUpperCase()} - Total: ${data.space[k].total}`,
													style: {
														fontSize: '16px'
													}
												},
												labels: ['Available', 'Occupied'],
											}}
										/>)
								}
							</div>
						</div>}
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}

export default Records;
