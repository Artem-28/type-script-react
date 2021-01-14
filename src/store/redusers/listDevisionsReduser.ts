import { MyDevision } from "../../entities/MyDevision"
import { GET_CURRENT_KEYS, GET_DEVISIONS_METADATA, GET_LIST_DEVISIONS, ListDevisionsActionTypes } from "../actions/actionTypes"

interface IState {
    devisions: MyDevision []
    metadata: {
        keys: (string | null)[]
        currentKeys: (string | null)[]
    }
}
const initialSate: IState = {
    devisions: [],
    metadata: {
        keys: [],
        currentKeys: []
    }
}

export default function ListDevisionsReduser(state = initialSate, action: ListDevisionsActionTypes): IState{
    switch(action.type){
        case GET_LIST_DEVISIONS:
            return {
                ...state,  devisions: action.payload
            }
        case GET_DEVISIONS_METADATA:
            return {
                ...state, metadata: {keys: action.payload, currentKeys: state.metadata.currentKeys}
            }
        case GET_CURRENT_KEYS:
            return {
                ...state, metadata: {keys: state.metadata.keys, currentKeys: action.payload}
            }
        default: return state
    }
}