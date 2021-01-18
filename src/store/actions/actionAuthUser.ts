import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { store } from "../redusers/rootReduser";
import { toggleLoading } from './actionLoading';
import { GET_USER_CURRENT_APP, IGetCurrentUserApp } from './actionTypes';


export function registrationUser(email: string, password: string){
    store.dispatch(toggleLoading(true))
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        store.dispatch(toggleLoading(false))
    })
    .catch((error) => {
        store.dispatch(toggleLoading(false))
        console.log(error)
    });
}

export function loginUser(email: string, password: string){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    console.log(error)
  });
}

export function autoLogin(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            store.dispatch(getCurrentUserApp(user.email))
        }else {
            store.dispatch(getCurrentUserApp(null))
        }
    })
}

function getCurrentUserApp(user: string | null): IGetCurrentUserApp {
    return {
        type: GET_USER_CURRENT_APP,
        payload: user
    }
}

export function logoutUser(){
    firebase.auth().signOut().then(() => {
        store.dispatch(getCurrentUserApp(null))
        
    })
}