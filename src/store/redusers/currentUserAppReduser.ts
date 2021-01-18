import { ActionAuthUser, GET_USER_CURRENT_APP } from "../actions/actionTypes";


interface IState {
    user: string | null
}

const initialState: IState = {
    user: null
} 

export default function CurrentUserAppReduser(state = initialState, action: ActionAuthUser): IState {
    switch(action.type){
        case GET_USER_CURRENT_APP:
            return {...state, user: action.payload}
        default: return state
    }
}