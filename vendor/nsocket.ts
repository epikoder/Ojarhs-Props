
type NsocketMessage = {
	uid: string
	type: string
	body: string
	action: string
	namespace: string
}

interface _NSocketClient {
	connect(): void
	on(n: string, f: (m: NsocketMessage) => void): void
	emit(n: string, m: NsocketMessage): void
}

class NSocketClient implements _NSocketClient {
	private url: string
	private client: WebSocket
	constructor(url?: string) {
		if (url == undefined) {
			let p = location?.protocol === "http" ? 'ws://' : 'wss://'
			let h = location?.host
			url = p + h + '/socket'
		}
		this.url = url
	}
	connect() {
		this.client = new WebSocket(this.url)
	}
	on(namespace: string, fun: (message) => void) {

	}
	emit(namespace: string) { }
}

export default NSocketClient