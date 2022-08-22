import uniqid from 'uniqid';
import nextId from "react-id-generator";
import { tenantsList } from './features/TenantsSlice';
import { useSelector } from 'react-redux';
import { Service, Space, Testimony } from './Typing.d';
// const tenant = useSelector(tenantsList)
export const AllProducts = [
	{
		amount: 40000,
		type: "service",
	},

	{
		amount: 20000,
		type: "service",
	},

	{
		amount: 10000,
		type: "service",
	},

	{
		amount: 50000,
		type: "service",
	},

	{
		amount: 10000,
		type: "service",
	},

	{
		amount: 40000,
		type: "service",
	},

	{
		amount: 40000,
		type: "service",
	},

	{
		amount: 40000,
		type: "service",
	},
	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "office",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},

	{
		status: "open",
		amount: 40000,
		shopNo: "B24",
		shopAddress: "no 13, eliot lagos, Nigeria",
		shopSize: " 20 by 20  ",
		shopDescription:
			"This is a great store where you can sell all types of things ",
		type: "shop",
	},
]

export const shops: Space[] = [
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442f",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442a",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f45e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f9a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
];

export const offices: Space[] = [
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442f",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442a",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f45e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f9a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
];

export const warehouse: Space[] = [
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442f",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df1065442a",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-bff7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f8a330b8-f45e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
	{
		id: "f9a330b8-f44e-469b-baf7-a5df10654423",
		name: "A property",
		status: 'open',
		amount: 40000,
		no: "B24",
		address: "no 13, eliot lagos, Nigeria",
		size: " 20 by 20  ",
		description: "This is a great store where you can sell all types of things ",
		type: "shop",
	},
];



export const services: Service[] = [
	{
		id: "f9a330b8-f44e-469b-baf7-a5df10654423",
		amount: 40000,
		description: "Electrical Maintenance and repairs",
		manager: "Emma Glory",
		name: "Electrical Maintenance",
		type: "service"
	},
];

export const testimony: Testimony[] = [
	{
		name: "Glory",
		testimony: "A very nice location, now i sell faster. Thank you Ojarhs ",
	},

	{
		name: "Ayo",
		testimony: "Very cool and conducive environment to work",
	},

	{
		name: "David",
		testimony: "Its always busy which means more customers, Nice",
	},

	{
		name: "Collins",
		testimony:
			"A very good location, now i make 5 times what i used to make, Thank you",
	},
];

export const MessageSubItem = [
	{
		name: "Disputes",
		link: "/Disputes"
	},

	{
		name: "Reports",
		link: "/Reports"
	}
]

export const TenantsSubItem = [
	{
		name: "All Tenants",
		link: "/AllTenants",
	},

	{
		name: "Active Tenants",
		link: "/ActiveTenants",
	},

	{
		name: "Banned Tenants",
		link: "/BannedTenants",
	},
];



export const TenantsDetails = [
	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},

	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},
	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},
	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "active",
	},
	{
		id: uniqid(),
		firstName: "Glory",
		lastName: "Ezomon",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "banned",
	},
	{
		id: uniqid(),
		lastName: "Ezomon",
		firstName: "Glory",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "banned",
	},
	{
		id: uniqid(),
		lastName: "Ezomon",
		firstName: "Glory",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "banned",
	},
	{
		id: uniqid(),
		lastName: "Ezomon",
		firstName: "Glory",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "banned",
	},
	{
		id: uniqid(),
		lastName: "Ezomon",
		firstName: "Glory",
		address: "12, Kgb street, Elliot, Lagos",
		shopNo: "15",
		phoneNo: "08056728846",
		email: "ezomonglory01@gmail.com",
		picture: "eg.jfif",
		states: "banned",
	},
];


export const DashProp = [
	{
		id: uniqid(),
		name: "Property1",
		PropNo: 12,
		PropSize: "20 by 20",
		PropDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sint placeat ab dolorum fuga unde laboriosam at cumque eos architecto voluptas ut vitae, dolor impedit reiciendis expedita quia, optio vel.",
		PropPrice: 20000,
		PropType: "warehouse",
		PropImages: [

		]
	}
]


