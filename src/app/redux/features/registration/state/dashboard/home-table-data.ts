import { Status } from "./status/status";

export interface HomeTableData {
    id: string
    avatar: string,
    fullName: string,
    registeredOn: string, //to be change
    status: Status
    mentor: string,
    action: boolean
}