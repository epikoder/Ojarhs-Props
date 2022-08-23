export type Space = {
	id: string
	name: string
	no: string
	size: string
	type: string
	description: string
	amount: number
	status: 'open' | 'occupied'
	address?: string
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
	picture: string;
	state: string;
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
	type: string
}

export type NextOfKin = {
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