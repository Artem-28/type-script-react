import { MyManager } from "../../entities/MyManager"
import { GET_LIST_MANAGERS, GET_MANAGERS_METADATA, GET_MANAGER_CURRENT_KEYS, ListManagersActionTypes } from "../actions/actionTypes"

interface IState {
    managers: MyManager []
    metadata: {
        keys: Array<string | null>
        currentKeys: (string | null)[]
    }
}
const initialSate: IState = {
    managers: [],
    metadata: {
        keys: [],
        currentKeys: []
    }
}

export default function ListManagersReduser(state = initialSate, action: ListManagersActionTypes): IState{
    switch(action.type){
        case GET_LIST_MANAGERS:
            return {
                ...state,  managers: action.payload
            }
        case GET_MANAGERS_METADATA:
            return {
                ...state, metadata: {keys: action.payload, currentKeys: state.metadata.currentKeys}
            }
        case GET_MANAGER_CURRENT_KEYS:
            return {
                ...state, metadata: {keys: state.metadata.keys, currentKeys: action.payload}
            }
        default: return state
    }
}