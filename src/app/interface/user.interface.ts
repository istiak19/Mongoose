export interface IUser {
    fName: string,
    lName: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN'
}