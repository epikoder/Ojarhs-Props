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