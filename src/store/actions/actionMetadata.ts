import firebase from 'firebase/app'
import 'firebase/database'
import { store } from '../redusers/rootReduser'
import { toggleLoading } from './actionLoading'
import { GET_CURRENT_KEYS, GET_DEVISIONS_METADATA, GET_MANAGERS_METADATA, IGetMetadata, MetadataTypes } from './actionTypes'

function getDevisionsMetadata(keysList: (string | null)[]): IGetMetadata{
    return {
        type: GET_DEVISIONS_METADATA,
        payload: keysList
    }
}

function getManagersMetadate(keysList: (string | null)[]): IGetMetadata{
    return {
        type: GET_MANAGERS_METADATA,
        payload: keysList
    }
}

export function getCurrentKeys(keysList: (string | null)[]): IGetMetadata {
    return {
        type: GET_CURRENT_KEYS,
        payload: keysList
    }   
}

export function fetchMetadate(metadata: MetadataTypes){
    store.dispatch(toggleLoading(true))
    const keysList: (string | null)[] = []
    firebase.database().ref(`${metadata}-metadata/keys`)
    .once('value', snapshot => {
        snapshot.forEach(item => {
            keysList.push(item.key)
        })
    }).then(() => {
        if (metadata === 'devisions') { store.dispatch(getDevisionsMetadata(keysList)) }
        if (metadata === 'managers') { store.dispatch(getManagersMetadate(keysList)) }
        store.dispatch(toggleLoading(false))
    })
}

export function updateMetadate(key: string | null, metadata: MetadataTypes){
    firebase.database().ref(`${metadata}-metadata/keys/${key}`).set('')
    fetchMetadate(metadata)
}