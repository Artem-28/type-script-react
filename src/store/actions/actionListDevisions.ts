import { IDevision } from "../../interfaces/devision";
import {GET_LIST_DEVISIONS, IGetListDevisions } from "./actionTypes";
import firebase from 'firebase/app'
import 'firebase/database'
import { toggleLoading } from './actionLoading';
import { store } from "../redusers/rootReduser";
import { MyDevision } from "../../entities/MyDevision";
import { IRange } from "../../pages/ListDevisionPage/ListDevisionsPage";
import { updateMetadate, fetchMetadate, getCurrentKeys } from "./actionMetadata";

export function getListDevisions(list: MyDevision[]): IGetListDevisions{
    return {
        type: GET_LIST_DEVISIONS,
        payload: list
    }
}


export function deleteDevision(key: string | null, range: IRange): void {
    store.dispatch(toggleLoading(true))
    firebase.database().ref(`devisions/${key}`).set(null)
    firebase.database().ref(`devisions-metadata/keys/${key}`).set(null)
    fetchListDevisions(range)
    fetchMetadate('devisions')
    store.dispatch(toggleLoading(false))
}



export function fetchListDevisions(range: IRange ): void {
    store.dispatch(toggleLoading(true))
    const listDevisions: MyDevision[] = []
    const currentKeys: (string | null)[] = []
   
    firebase.database().ref('devisions')
    .orderByChild('devisions')
    .startAt(null, range.startKey || undefined)
    .limitToFirst(range.limit)
    .once('value', devisions => {
        devisions.forEach(devision => {
            currentKeys.push(devision.key)
            const getDevision = new MyDevision(devision.val().name, new Date(devision.val().date))
            getDevision.setId = devision.val().id
            listDevisions.push(getDevision)
        })
    }).then(()=> {
        store.dispatch(getCurrentKeys(currentKeys))
        store.dispatch(getListDevisions(listDevisions))
        store.dispatch(toggleLoading(false))
    })
}


export function addedDevision(devision: IDevision, range: IRange): void {
    store.dispatch(toggleLoading(true))
    const key = firebase.database().ref('devisions').push({
        id: devision.id,
        name: devision.name.toLowerCase(),
        date: String(devision.date)
    }).key
    updateMetadate(key, 'devisions')
    fetchListDevisions(range)
}