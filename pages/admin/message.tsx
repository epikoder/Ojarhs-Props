import React from "react";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Message() {
	return <AdminDashboardLayout>
		{
			() => <React.Fragment>
				<div>hello world</div>
			</React.Fragment>
		}
	</AdminDashboardLayout>
}

export default Message;
