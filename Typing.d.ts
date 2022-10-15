export type User = Partial<Tenant> & {
	is_admin: boolean
	is_disabled: boolean
	is_locked: boolean
	email_verified: boolean
	roles?: string[]
	permissions?: string[]
}

export type Space = {
	slug: string
	name: string
	no: string
	size: string
	type: string
	description: string
	amount: number
	photo: string
	galleries?: string[]
	video?: string
	video_galleries?: string[]
	status?: 'open' | 'occupied'
	address?: string
	plan: string
	duration?: number
	tenant?: string
	created_at?: Date
	updated_at?: Date
}

export type Tenant = {
	id: string
	fname: string;
	lname: string;
	address: string;
	phone: string;
	email: string;
	photo: string;
	reference: string
	lga: string;
	state: string;
	country: string;
	guarantor_name: string
	guarantor_phone: string
	guarantor_address: string
};

export type Inputs = {
	fname: string
	lname: string
	email: string
	shopNo: string
	phoneNo: string
	registerationCode: string
	address: string
	password: string
};



export type Service = {
	slug: string
	name: string
	description: string
	amount: number
	manager: string
	type?: 'service'
	plan?: string
	photo?: string
	duration?: number
	created_at?: Date
	updated_at?: Date
}

export type NextOfKin = {
	kfname: string
	klname: string
	kemail: string
	kphone: number
	kaddress: string
	klga: string
	kstate: string
	kcountry: string
}

export type NextOfKinApi = {
	fname: string
	lname: string
	email: string
	phone: number
	address: string
	lga: string
	state: string
	country: string
}

export type SignUpForm = {
	fname: string
	lname: string
	email: string
	phone: number
	password: string
	address: string
	lga: string
	state: string
	country: string
	photo: string
	guarantor_name: string
	guarantor_address: string
	guarantor_phone: number
	business: string
	appliances: string
	interested_shop: string
	next_of_kins: NextOfKin[]
}

export type UserUpdateForm = Partial<User>

export type Country = {
	id: number
	name: string
	code: string
}

export type ApiResponse<T = any, TT = any> = {
	status: 'success' | 'failed'
	message?: string
	error?: { [key: string]: string }
	data?: T
	extra?: TT
}

export type loginResponse = {
	access: string
	refresh?: string
	access_expires_at: Date
	refresh_expires_at?: Date
}

export type LoadState = 'nil' | 'pending' | 'success' | 'failed'
export type Map<T = any> = { [key: string]: T }
export type DashboardDataState<T> = {
	data: T
	err?: Map<string>
	status: LoadState
	message?: string
}
export type UserApplicationStatus = 'nil' | 'pending' | 'verified' | 'rejected' | 'document-required'
export type UserApplication = {
	id: string
	user_id: string
	status: UserApplicationStatus
	message: string
	document: string
}

export type Advert = {
	id: number
	link: string
	photo: string
	position: 'slider' | 'middle' | 'property'
	approved: boolean
	expires_at: Date
}

export type UserApplication = {
	status: UserApplicationStatus
	document: string
	type: string
}

export type QueryParam = {
	search?: string
	chunck?: number
	offset?: number
} & Map<string | number | boolean>

export interface MessageOwner {
	id: number
	title: string
	messages: Message[]
	is_resolve?: boolean
	level?: DisputeLevel
}

export type MessageType = 'text' | 'image' | 'pdf'
export type DisputeLevel = 0 | 1 | 2
export type MessageForm = {
	id?: number
	content: string
	type: MessageType
	is_dispute?: boolean
	is_report?: boolean
	owner_id?: number
	owner_type?: 'conversations' | 'disputes' | 'reports'
	receiver?: string
}

export type Message = {
	id?: number
	content: string
	type: MessageType
	is_read?: boolean
	is_dispute?: boolean
	is_report?: boolean
	is_resolved?: boolean
	owner_id?: number
	owner_type?: 'conversations' | 'disputes' | 'reports'
	sender?: User
	receiver?: User
	created_at: Date
}
export type MesssageForm = {
	id?: string
	title: string
	content: string
	type: MessageType
	is_read?: boolean
	is_dispute?: boolean
	is_report?: boolean
	receiver?: string
	dispute_level?: DisputeLevel
}

export type MessageState = {
	state: LoadState
	data: MessageOwner[]
}

export type Receipt = {
	id: string
	name: string
	type: string
	slug: string
	amount: number
	created_at: string
	expires: string
}

export type PackoutRequest = {
	id: number
	name: string
	property: string
	date: string
	fname?: string
	lname?: string
	status: 0 | 1 | 2
	reason: string
}

export type Notice = {
	id?: number
	title: string
	type: 'text' | 'image'
	content: string
}

export type Staff = {
	id?: string
	name: string
	email: string
	phone: string
	description: string
	fee: number
	is_disabled?: string
}

export type Expense = {
	id?: string
	name: string
	duration: number
	amount: number
	description: string
}

export type Invoice = {
	items: InvoiceItem[]
	total: number
	created_at?: Date
} & Partial<User>

export type InvoiceItem = {
	item: string
	description: string
	quantity: number
	amount: number
}

export type Contact = {
	id?: number
	name: string
	email: string
	phone: string
	subject: string
	message: string
	response?: string
}