import { BlacReact, Cubit } from 'blac'
import io, { Socket } from 'socket.io-client'
import { decodeJwt } from 'jose'
import { Notifications, User } from 'Typing'
import { getUserToken } from 'helpers/auth'
import { WSURL } from 'config'

export class SocketState extends Cubit<Socket>{
	constructor() {
		super(io(WSURL, {
			extraHeaders: {
				id: ''
			},
			reconnectionDelay: 3000,
		}))
	}
	connect = (id: string) => {
		const socket = io(WSURL, {
			extraHeaders: {
				id: id
			},
			reconnectionDelay: 3000,
		})
		this.emit(socket)
	}

	disconnect = () => {
		this.state.disconnect()
	}

	notify = (n: Notifications) => {
		this.state.emit('notification', n)
	}
}

export const { useBloc: useSocketBloc } = new BlacReact([new SocketState()])