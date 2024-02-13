export interface IUser {

    id: number | null,
    name: string | null,
    surname: string | null,
    username: string | null,
    password: string | null,
    logged: boolean | null,
    jwt: string | null,
    rules: any

}