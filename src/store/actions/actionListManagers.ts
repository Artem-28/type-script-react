import firebase from 'firebase/app'
import 'firebase/database'
import { store } from "../redusers/rootReduser";
import { toggleLoading } from "./actionLoading";
import { MyManager, SendManager } from "../../entities/MyManager";
import { MyDevision } from "../../entities/MyDevision";
import { GET_LIST_MANAGERS, IGetListManagers } from "./actionTypes";
import { IRange } from "../../pages/ListDevisionPage/ListDevisionsPage";
import { fetchMetadate, getManagerCurrentKeys } from "./actionMetadata";


export function addedManager(manager: SendManager): void{
    store.dispatch(toggleLoading(true))
    const key = firebase.database().ref('managers').push({
        id: manager.id,
        uuid: manager.uuid,
        lastName: manager.lastName.toLowerCase(),
        name: manager.name.toLowerCase(),
        devisionKey: manager.devisionKey,
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


function formatManagersList(list: SendManager []){
    const listManagers: MyManager [] = []
    list.map( manager => {
        let devision: MyDevision
         firebase.database().ref(`devisions/${manager.devisionKey}`).once('value', snapShot => { 
            if(snapShot.val() !== null){
                devision = new MyDevision(snapShot.val().name, new Date(snapShot.val().date))
                devision.setId = snapShot.val().id
            } else {
                devision = new MyDevision('подразделения не существует', new Date())
            }
            
        }).then(()=> {
            listManagers.push(new MyManager(manager.lastName, manager.name, devision, manager.date))
            store.dispatch(getListManagers(listManagers))
            store.dispatch(toggleLoading(false))
        })
        return null
    })
}

export function fetchListManagers (range: IRange ) {
    store.dispatch(toggleLoading(true))
    const currentKeys: (string | null)[] = []
    const resultGetManager: SendManager [] = []
    firebase.database().ref('managers')
    .orderByChild('managers')
    .startAt(null, range.startKey || undefined)
    .limitToFirst(range.limit)
    .once('value',  managers => {
       managers.forEach(value => {
            currentKeys.push(value.key)
            const manager = new SendManager(
                value.val().lastName,
                value.val().name,
                value.val().devisionKey,
                new Date (value.val().date)
            )
            manager.id = value.val().id
            manager.uuid = value.val().uuid
            resultGetManager.push(manager)
       })
    }).then(() => {
        store.dispatch(getManagerCurrentKeys(currentKeys)) 
        formatManagersList(resultGetManager)
    })
}

function getListManagers(managers: MyManager[]): IGetListManagers {
    return {
        type: GET_LIST_MANAGERS,
        payload: managers
    }
}