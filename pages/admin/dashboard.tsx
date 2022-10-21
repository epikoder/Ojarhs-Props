import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { Card } from "@mui/material";
import DashCards from "components/DashCards";
import { Chat, Message, Report } from "@mui/icons-material";
import { BlacReact, Cubit } from "blac";
import { Api } from "helpers/api";
import { ApiResponse } from "Typing";
import { useEffect } from "react";

type DashboardStateData = {
	message: number, report: number, dispute: number
}
class DashboardState extends Cubit<DashboardStateData> {
	constructor() {
		super({ message: 0, dispute: 0, report: 0 })
	}

	fetchData = async () => {
		try {
			const { data } = await Api().get<ApiResponse<DashboardStateData>>('/admin/dashboard')
			this.emit(data.data || { message: 0, dispute: 0, report: 0 })
		} catch (error) {

		}
	}
}
const { useBloc } = new BlacReact([new DashboardState()])
function Dashboard() {
	const [{ dispute, message, report }, { fetchData }] = useBloc(DashboardState)

	useEffect(() => {
		fetchData()
	}, [])
	return <AdminDashboardLayout>
		{
			({ user }) => <div className="space-y-4">
				<Card elevation={2} className='max-w-fit p-4 text-lg'>
					<span className="text-sec">Welcome{' '}</span>
					<span style={{
						fontFamily: 'Space Grotesk'
					}}>
						{user.lname} {user.fname}
					</span>
				</Card>
				<div className="grid gap-2 md:grid-cols-2">
					<DashCards
						name="Messages"
						value={message}
						endIcon={<Message />}
						className='pt-2 p-4 text-lg' />
					<DashCards
						name="Disputes"
						value={dispute}
						endIcon={<Chat />}
						className=' pt-2 p-4 text-lg' />
					<DashCards
						name="Reports"
						value={report}
						endIcon={<Report />}
						className='pt-2 p-4 text-lg' />
				</div>
			</div>
		}
	</AdminDashboardLayout>
}

export default Dashboard;
