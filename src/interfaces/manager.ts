import { IDevision } from "./devision";

export interface IManager {
    id: number
    uuid: string
    lastName: string
    name: string
    devision: IDevision
    date: Date
}