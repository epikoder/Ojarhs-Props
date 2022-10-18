import { Notifications } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Cubit, BlacReact } from "blac"
import { WSURL } from "config"
import { useEffect, useState } from "react"
import NSocketClient from "vendor/nsocket"
import { Message } from "vendor/nsocket.d"
import { KMenu } from "./Menu"

class NSocketState extends Cubit<{
	nsocket: NSocketClient,
	connected: boolean
}>
{
	constructor() {
		const nsocket: NSocketClient = new NSocketClient(WSURL, {
			reconnect: 5000,
			maxRetries: 20
		})
		super({ nsocket, connected: false })
		nsocket.connect(() => {
			this.emit({ nsocket, connected: true })
		}, () => {
			this.emit({ nsocket, connected: false })
		})
	}
}

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

const { useBloc: useNSocketState } = new BlacReact([new NSocketState()])
const { useBloc: useNotificationState } = new BlacReact([new NotificationState({
	hasNew: false,
	data: []
})])

const NotificationBox = () => {
	const [{ hasNew, data }, { markRead, markUnread }] = useNotificationState(NotificationState)
	const [{ nsocket, connected }] = useNSocketState(NSocketState)

	useEffect(() => {
		console.log(!nsocket?.isSubscribed('message'), connected)
		if (!nsocket?.isSubscribed('message') || connected) {
			nsocket.on('message', handleMessage)
		}
	}, [nsocket, connected])

	const handleMessage = (m: Message) => {
		console.log('Notification-----', m)
		markUnread()
	}

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
						nsocket.emit('Hello formm notic')
						nsocket.emit('Hello formm notic', 'message')
					}}>
					No Notification
				</div>} />
	</>
}
export default NotificationBox