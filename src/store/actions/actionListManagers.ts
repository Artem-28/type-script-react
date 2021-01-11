import { IManager } from "../../interfaces/manager";
import firebase from 'firebase/app'
import 'firebase/database'
import { store } from "../redusers/rootReduser";
import { toggleLoading } from "./actionLoading";

export function addedManager(manager: IManager): void{
    store.dispatch(toggleLoading(true))
    const key = firebase.database().ref('managers').push({
        id: manager.id,
        uuid: manager.uuid,
        lastName: manager.lastName.toLowerCase(),
        name: manager.name.toLowerCase(),
        devision: {
            id: manager.devision.id,
            name: manager.devision.name,
            date: String(manager.devision.date)
        },
        date: String(manager.date)
    }).key
    updateManagersMetadate(key)
    
}

function updateManagersMetadate(key: string | null){
    firebase.database().ref(`managers-metadata/keys/${key}`).set('')
    store.dispatch(toggleLoading(false))
}