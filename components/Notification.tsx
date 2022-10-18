import { Notifications } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Cubit, BlacReact } from "blac"
import { KMenu } from "./Menu"


class NotificationState extends Cubit<{
	hasNew: boolean
	data: string[]
}>
{
	markRead = () => this.emit({
		...this.state, hasNew: false
	})
	markUnread = () => this.emit({
		...this.state, hasNew: true
	})
}

const { useBloc: useNotificationState } = new BlacReact([new NotificationState({
	hasNew: false,
	data: []
})])

const NotificationBox = () => {
	const [{ hasNew, data }, { markRead, markUnread }] = useNotificationState(NotificationState)

	return <>
		<KMenu
			overrideButton
			button={
				<IconButton className="mx-2" onClick={markRead}>
					<Notifications fontSize="small" />
					{hasNew &&
						<div className="relative">
							<div className="absolute -top-3">
								<div className="absolute animate-ping rounded-full h-3 w-3 bg-red-500"></div>
								<div className="absolute rounded-full h-3 w-3 bg-red-500"></div>
							</div>
						</div>}
				</IconButton>
			}
			menu={data?.length > 0 ? data?.map((v, i) => (<div key={i}> {v} </div>)) :
				<div key={0} className='text-xs h-24 p-2 flex flex-col justify-center items-center'
					onClick={() => {
					}}>
					No Notification
				</div>} />
	</>
}
export default NotificationBox