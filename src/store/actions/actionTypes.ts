import { MyDevision } from "../../entities/MyDevision"


export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const GET_LIST_DEVISIONS = 'GET_LIST_DEVISION'
export const GET_DEVISIONS_METADATA = 'GET_DEVISIONS_METADATA'


export interface IToggleLoader {
    type: typeof TOGGLE_LOADING
    payload: boolean
}

export interface IGetListDevisions {
    type: typeof GET_LIST_DEVISIONS
    payload: MyDevision[]
}

export interface IGetDevisionsMetadate {
    type: typeof GET_DEVISIONS_METADATA
    payload: (string | null)[]
}

export type LoadingActionTypes = IToggleLoader
export type ListDevisionsActionTypes = IGetListDevisions | IGetDevisionsMetadate
export type AppActions = LoadingActionTypes | ListDevisionsActionTypes