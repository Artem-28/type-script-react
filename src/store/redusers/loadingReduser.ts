import { TOGGLE_LOADING, LoadingActionTypes} from "../actions/actionTypes";

const initialSate: boolean = false

export default function loadingReduser(state = initialSate, action: LoadingActionTypes): boolean{
    switch(action.type){
        case TOGGLE_LOADING: return state = action.payload
        default: return state
    }
}