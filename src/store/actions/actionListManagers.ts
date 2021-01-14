import { IManager } from "../../interfaces/manager";
import firebase from 'firebase/app'
import 'firebase/database'
import { store } from "../redusers/rootReduser";
import { toggleLoading } from "./actionLoading";
import { MyManager } from "../../entities/MyManager";
import { MyDevision } from "../../entities/MyDevision";
import { GET_LIST_MANAGERS, IGetListManagers } from "./actionTypes";
import { IRange } from "../../pages/ListDevisionPage/ListDevisionsPage";
import { fetchMetadate } from "./actionMetadata";

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
    firebase.database().ref(`managers-metadata/keys/${key}`).set('').then(()=> {
        store.dispatch(toggleLoading(false))
    })
    
}

export function deleteManager(key: string | null, range: IRange): void {
    store.dispatch(toggleLoading(true))
    firebase.database().ref(`managers/${key}`).set(null)
    firebase.database().ref(`managers-metadata/keys/${key}`).set(null)
    fetchListManagers(range)
    fetchMetadate('managers')
    store.dispatch(toggleLoading(false))
}

export function fetchListManagers (range: IRange ) {
    store.dispatch(toggleLoading(true))
    const listManagers: MyManager [] = []
    firebase.database().ref('managers')
    .orderByChild('managers')
    .startAt(null, range.startKey || undefined)
    .limitToFirst(range.limit)
    .once('value', managers => {
        managers.forEach(manager => {
            const getDevision = new MyDevision(
                manager.val().devision.name,
                new Date (manager.val().devision.date)
            )
            getDevision.setId = manager.val().devision.id
            const getManager = new MyManager(
                manager.val().lastName,
                manager.val().name,
                getDevision,
                new Date(manager.val().date) 
            )
            getManager.setId = manager.val().id
            getManager.setUuid = manager.val().uuid  
            listManagers.push(getManager)
        })
    }).then(() => {
       store.dispatch(getListManagers(listManagers))
       store.dispatch(toggleLoading(false))
    })
}

function getListManagers(managers: MyManager[]): IGetListManagers {
    return {
        type: GET_LIST_MANAGERS,
        payload: managers
    }
}