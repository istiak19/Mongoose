import { Model } from "mongoose"

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

export interface UserMethods extends Model<IUser> {
    hashPassword(password: string): string
}

export interface UserStaticMethods extends Model<IUser> {
    hashPassword(password: string): string
}