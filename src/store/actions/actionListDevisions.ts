import { IDevision } from "../../interfaces/devision";
import { GET_DEVISIONS_METADATA, GET_LIST_DEVISIONS, IGetDevisionsMetadate, IGetListDevisions } from "./actionTypes";
import firebase from 'firebase/app'
import 'firebase/database'
import { toggleLoading } from './actionLoading';
import { store } from "../redusers/rootReduser";
import { MyDevision } from "../../entities/MyDevision";
import { IRange } from "../../pages/ListDevisionPage/ListDevisionsPage";

export function getListDevisions(list: MyDevision[]): IGetListDevisions{
    return {
        type: GET_LIST_DEVISIONS,
        payload: list
    }
}

export function getDevisionsMetadata(keysList: (string | null)[]): IGetDevisionsMetadate{
    return {
        type: GET_DEVISIONS_METADATA,
        payload: keysList
    }
}

export function deleteDevision(key: string | null, range: IRange): void {
    store.dispatch(toggleLoading(true))
    firebase.database().ref(`devisions/${key}`).set(null)
    firebase.database().ref(`devisions-metadata/keys/${key}`).set(null)
    fetchListDevisions(range)
    fetchDevisionsMetadate()
    store.dispatch(toggleLoading(false))
}

export function updateDivision(devision: IDevision, key: string | null, range: IRange): void {
    store.dispatch(toggleLoading(true))
    firebase.database().ref(`devisions/${key}`).update({name: devision.name, date: devision.date})
    fetchListDevisions(range)
    store.dispatch(toggleLoading(false))
}

export function fetchListDevisions(range: IRange ): void {
    store.dispatch(toggleLoading(true))
    const listDevisions: MyDevision[] = []
   
    firebase.database().ref('devisions').orderByChild('devisions')
    .startAt(null, range.startKey || undefined)
    .limitToFirst(range.limit)
    .once('value', devisions => {
        devisions.forEach(devision => {
            const getDevision = new MyDevision(devision.val().name, new Date(devision.val().date))
            getDevision.setId = devision.val().id
            listDevisions.push(getDevision)
        })
    }).then(()=> {
        store.dispatch(getListDevisions(listDevisions))
        store.dispatch(toggleLoading(false))
    })
}

export function fetchDevisionsMetadate(){
    const keysList: (string | null)[] = []
    firebase.database().ref('devisions-metadata/keys')
    .once('value', snapshot => {
        snapshot.forEach(item => {
            keysList.push(item.key)
        })
    }).then(() => {
        store.dispatch(getDevisionsMetadata(keysList))
    })
}

function updateDevisionsMetadate(key: string | null){
    firebase.database().ref(`devisions-metadata/keys/${key}`).set('')
    fetchDevisionsMetadate()
}

export function addedDevision(devision: IDevision, range: IRange): void {
    store.dispatch(toggleLoading(true))
    const key = firebase.database().ref('devisions').push({
        id: devision.id,
        name: devision.name.toLowerCase(),
        date: String(devision.date)
    }).key
    updateDevisionsMetadate(key)
    fetchListDevisions(range)
}