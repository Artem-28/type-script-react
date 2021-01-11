import firebase from 'firebase/app'
import 'firebase/database'

export function getOptionSelectDevisions (value: string){
    return firebase.database().ref('devisions')
    .orderByChild('name')
    .startAt(value)
    .once('value')
}