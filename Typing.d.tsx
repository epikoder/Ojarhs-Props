// export type Shop = {
// 	status: string;
// 	amount: number;
// 	shopNo: string;
// 	shopAddress: string;
// 	shopSize: string;
// 	shopDescription: string;
// 	type: string;
// };

// export type Properties = {
// 	id:string
// 	name:string
// 	PropNo:number
// 	PropSize:string
// 	PropType:string
// 	PropDescription:string
// 	PropPrice:number	
//   }

  export type Space = {
	Id:string
	Name:string
	No:number
	Size:string
	Type:string
	Description:string
	Price:number
	Address?:string
  }

export type Testimony = {
	name: string;
	testimony: string;
};

export type Tenants = {
	id:string
	firstName: string;
	lastName: string;
	address: string;
	shopNo: string;
	phoneNo: string;
	email: string;
	picture: string;
	states: string;	
};

export type Inputs = {	
	firstName:string
	lastName:string
	email:string
	shopNo:string
	phoneNo:string	
	registerationCode:string
	address:string	
	password:string
  };



  export type Serv = {
	amount:number
	type:string
  }