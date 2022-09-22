interface IAddress {
  apartmentNumber: number;
  streetName?: string;
  postalCode: string;
  state?: string;
  country?: string;
}


interface IEmployee {
  id: number;
  firstName?:	string;
  lastName?: string;
  email?:	string;
  phoneNumber?:	string;
  addresses: IAddress[];
}
