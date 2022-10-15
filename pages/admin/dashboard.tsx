import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { Card } from "@mui/material";
import DashCards from "components/DashCards";
import { Chat, Message, Report } from "@mui/icons-material";

function Dashboard() {
	return <AdminDashboardLayout>
		{
			({ user }) => <div className="space-y-4">
				<Card elevation={2} className='max-w-fit p-4 text-lg'>
					<span className="text-sec">Welcome{' '}</span>
					<span>
						{user.lname} {user.fname}
					</span>
				</Card>
				<div className="grid gap-2 md:grid-cols-2">
					<DashCards
						name="Messages"
						value={102}
						endIcon={<Message />}
						className='pt-2 p-4 text-lg' />
					<DashCards
						name="Disputes"
						value={58}
						endIcon={<Chat />}
						className=' pt-2 p-4 text-lg' />
					<DashCards
						name="Reports"
						value={10}
						endIcon={<Report />}
						className='pt-2 p-4 text-lg' />
				</div>
			</div>
		}
	</AdminDashboardLayout>
}

export default Dashboard;
