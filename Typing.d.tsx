export type User = Tenants & {
	is_admin: boolean
	is_disabled: boolean
	is_locked: boolean
}

export type Space = {
	id: string
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
	plan_name: string
	duration?: number
	created_at?: Date
	updated_at?: Date
}

export type Testimony = {
	name: string;
	testimony: string;
};

export type Tenants = {
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
	id: string
	name: string
	description: string
	amount: number
	manager: string
	type: 'service'
	plan_name?: string
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

export type Country = {
	id: number
	name: string
	code: string
}

export type ApiResponse<T = any> = {
	status: 'success' | 'failed'
	message?: string
	error?: { [key: string]: string }
	data: T
}

export type loginResponse = {
	access: string
	refresh?: string
	access_expires_at: Date
	refresh_expires_at?: Date
}

export type LoadState = 'pending' | 'success' | 'failed'
export type Map<T = any> = { [key: string]: T }
export type DashboardDataState<T> = {
	data: T
	status: LoadState
}