import { MyDevision } from "../../entities/MyDevision"
import { GET_DEVISIONS_METADATA, GET_LIST_DEVISIONS, ListDevisionsActionTypes } from "../actions/actionTypes"

interface IState {
    devisions: MyDevision []
    metadata: {
        keys: Array<string | null>
    }
}
const initialSate: IState = {
    devisions: [],
    metadata: {
        keys: [],
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
                ...state, metadata: {keys: action.payload}
            }
        default: return state
    }
}