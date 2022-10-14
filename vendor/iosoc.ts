
type TnnyMessage = {
	uid: string
	type: string
	body: string
	action: string
	namespace: string
}

interface TnnyEvents {
	Default: Map<string, () => void>
}

interface _TnnyClient {
	connect(): void
	on(n: string, f: (m: TnnyMessage) => void): void
	emit(n: string, m: TnnyMessage): void
}

class TnnyClient implements _TnnyClient {
	private url: string
	private client: WebSocket
	private config?: TnnyEvents
	constructor(url?: string, _config?: TnnyEvents) {
		if (url == undefined) {
			let p = location?.protocol === "http" ? 'ws://' : 'wss://'
			let h = location?.host
			url = p + h + '/socket'
		}
		this.url = url
		this.config = _config
	}
	connect() {
		this.client = new WebSocket(this.url)
	}
	on(namespace: string, fun: (message) => void) {

	}
	emit(namespace: string) { }
}

export default TnnyClient