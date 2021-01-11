import { LoadingActionTypes, TOGGLE_LOADING } from "./actionTypes";

export function toggleLoading(isLoading: boolean): LoadingActionTypes {
    return {
        type: TOGGLE_LOADING,
        payload: isLoading
    }
}