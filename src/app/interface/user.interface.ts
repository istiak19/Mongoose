export interface IAddress {
    street: string,
    city: string,
    postalCode: number
}

export interface IUser {
    fName: string,
    lName: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN',
    address: IAddress
}