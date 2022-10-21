import { Chat, Delete, Message as MessageIcon, Notifications as NotificationsIcon, Report } from "@mui/icons-material"
import { Card, IconButton } from "@mui/material"
import { Cubit, BlacReact } from "blac"
import { KMenu } from "./Menu"
import { SocketState, useSocketBloc } from "utils/socket"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store"
import { Message, Notifications } from "Typing"

class NotificationState extends Cubit<{
	hasNew: boolean
	data: Notifications[],
	socketInitialized?: boolean
}>
{
	constructor() {
		super({
			hasNew: false,
			data: [],
		})
	}
	private maxLenght = 10
	markRead = () => this.emit({
		...this.state, hasNew: false
	})
	markUnread = () => this.emit({
		...this.state, hasNew: true
	})
	addNotification = (n: Notifications) => {
		let data = this.state.data
		data = data.concat(n)
		let diff = data.length - this.maxLenght
		this.emit({ ...this.state, data: data.slice(diff >= 0 ? diff : 0, data.length) })
	}
	clearNotification = () => this.emit({ ...this.state, data: [] })

	setInit = (socketInitialized: boolean, callback: () => void) => {
		if (this.state.socketInitialized === socketInitialized) return
		this.emit({ ...this.state, socketInitialized })
		callback()
	}
}

const { useBloc: useNotificationState } = new BlacReact([new NotificationState()])

const NotificationBox = () => {
	const [{ hasNew, data }, { setInit, markRead, markUnread, addNotification, clearNotification }] =
		useNotificationState(NotificationState)
	const [socket, { connect, disconnect }] = useSocketBloc(SocketState)
	const { user } = useSelector((store: RootState) => store.authSlice)
	const timeout = useRef<ReturnType<typeof setTimeout>>()

	const eventHandler = (ev: string, arg) => {
		const event = ev.split('-').shift()
		switch (event) {
			case "message":
				{
					const m: Message = arg
					if (m.sender?.id === user?.id) return
					const type = m.owner_type === 'conversations' ? 'message' : (m.owner_type === 'disputes' ? 'dispute' : 'report')
					addNotification({
						message: 'New ' + type + ': ' + m.content,
						type: type,
						created_at: new Date(),
					})
					markUnread()
					break
				}
			case "notification":
				{
					const n: Notifications = arg
					addNotification({ ...n, created_at: new Date() })
					markUnread()
				}
		}
	}

	useEffect(() => {
		setInit(user !== undefined, user !== undefined ? () => connect(user.id) : () => disconnect())
	}, [user])

	useEffect(() => {
		socket.offAny()
		timeout.current = setTimeout(() => {
			if (socket === undefined) return
			if (socket.listenersAny().length === 0) {
				socket.onAny(eventHandler)
			}
		}, 1000)
		return () => clearTimeout(timeout.current)
	}, [socket])

	return <>
		<KMenu
			overrideButton
			button={
				<IconButton className="mx-2" onClick={markRead}>
					<NotificationsIcon fontSize="small" />
					{hasNew &&
						<div className="relative">
							<div className="absolute -top-3">
								<div className="absolute animate-ping rounded-full h-3 w-3 bg-red-500"></div>
								<div className="absolute rounded-full h-3 w-3 bg-red-500"></div>
							</div>
						</div>}
				</IconButton>
			}
			menu={data?.length > 0 ?
				data?.map((v, i) => (
					<Card elevation={2} key={i} className='m-2 p-1 w-[170px]'>
						<div className="flex items-center justify-between space-x-2">
							{
								v.type === 'dispute' ? <Chat fontSize="small" />
									: v.type === 'message' ? <MessageIcon fontSize="small" />
										: <Report fontSize="small" />
							}
							<div className="text-xs">
								<div className='two-lines ellipse'>
									{v.message}
								</div>
								<div className="text-[9px] text-right text-sec">
									{(new Date(v.created_at || new Date())).toLocaleDateString()}
								</div>
							</div>
						</div>
					</Card>))
					.concat(<div className="text-center mt-2">
						<IconButton onClick={clearNotification} size="small">
							<Delete fontSize="small" />
						</IconButton>
					</div>) :
				<div key={0} className='text-xs text-center uppercase h-24 p-2 flex flex-col justify-center w-32 items-center'
					onClick={() => {
						socket.emit('message', 'testing')
					}}>
					Notifications
				</div>} />
	</>
}
export default NotificationBox