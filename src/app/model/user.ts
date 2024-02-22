export interface IUser {

    id: number | null,
    name: string | null|undefined,
    surname: string | null|undefined,
    username: string | null |undefined,
    password: string | null,
    logged: boolean | null,
    jwt: string | null,
    rules: any

}