import { MyManager } from "../../entities/MyManager"
import { GET_LIST_MANAGERS, GET_MANAGERS_METADATA, ListManagersActionTypes } from "../actions/actionTypes"

interface IState {
    managers: MyManager []
    metadata: {
        keys: Array<string | null>
    }
}
const initialSate: IState = {
    managers: [],
    metadata: {
        keys: [],
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
                ...state, metadata: {keys: action.payload}
            }
        default: return state
    }
}