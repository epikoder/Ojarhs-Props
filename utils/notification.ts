import { WSURL } from "../config";
import { io, Socket } from "socket.io-client";

export const StartNotify = () => {
	ioNotify.start()
}

class IoNotify {
	private client: Socket
	private connected: boolean
	start() {
		// this.client = io(WSURL)
	}
}

const ioNotify = new IoNotify()