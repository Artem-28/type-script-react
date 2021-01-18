import { MyDevision } from "../../entities/MyDevision"
import { MyManager } from "../../entities/MyManager"


export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const GET_LIST_DEVISIONS = 'GET_LIST_DEVISION'
export const GET_DEVISIONS_METADATA = 'GET_DEVISIONS_METADATA'
export const GET_MANAGERS_METADATA = 'GET_MANAGERS_METADATA'
export const GET_DEVISION_CURRENT_KEYS = 'GET_DEVISION_CURRENT_KEYS'
export const GET_MANAGER_CURRENT_KEYS = 'GET_MANAGER_CURRENT_KEYS'
export const GET_LIST_MANAGERS = 'GET_LIST_MANAGERS'
export const GET_USER_CURRENT_APP = 'GET_USER_CURRENT_APP'


export interface IToggleLoader {
    type: typeof TOGGLE_LOADING
    payload: boolean
}

export interface IGetListDevisions {
    type: typeof GET_LIST_DEVISIONS
    payload: MyDevision[]
}

export interface IGetMetadata {
    type: typeof GET_DEVISIONS_METADATA 
    | typeof GET_MANAGERS_METADATA 
    | typeof GET_DEVISION_CURRENT_KEYS
    | typeof GET_MANAGER_CURRENT_KEYS
    payload: (string | null)[]
}

export interface IGetListManagers {
    type: typeof GET_LIST_MANAGERS
    payload: MyManager[]
}

export interface IGetCurrentUserApp {
    type: typeof GET_USER_CURRENT_APP
    payload: string | null
}
export type MetadataTypes = 'managers' | 'devisions'
export type LoadingActionTypes = IToggleLoader
export type ListDevisionsActionTypes = IGetListDevisions | IGetMetadata
export type ListManagersActionTypes = IGetListManagers | IGetMetadata
export type ActionAuthUser = IGetCurrentUserApp
export type AppActions = LoadingActionTypes | ListDevisionsActionTypes | ListManagersActionTypes | ActionAuthUser
