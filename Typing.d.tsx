export type User = Tenant & {
	is_admin: boolean
	is_disabled: boolean
	is_locked: boolean
	email_verified: boolean
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

export type Testimony = {
	name: string;
	photo?: string
	testimony: string;
};

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

export type Staff = {
	id: string
	name: string
	description: string
	fee: number
	no: string
	email: String
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
	next_of_kins: NextOfKin[]
}

export type UserUpdateForm = {
	fname: string
	lname: string
	phone: string
	photo: string
	address: string
	lga: string
	state: string
	country: string
}

export type Country = {
	id: number
	name: string
	code: string
}

export type ApiResponse<T = any, TT = any> = {
	status: 'success' | 'failed'
	message?: string
	error?: { [key: string]: string }
	data: T
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
}