import { MyControlSelectDevision, MyControlText } from "../entities/MyControls"
import * as EmailValidator from 'email-validator';
import { controlType } from "../interfaces/formControl"


export function validateControl(control: controlType): boolean {
    let isValid: boolean = true
    if (control instanceof MyControlSelectDevision) {
        isValid = control.value !== null && isValid
    } else if (control.validation.required && typeof(control.value) === 'string'){
        isValid = control.value.trim() !== '' && isValid
    } 
    if (control instanceof MyControlText && control.validation.minLength) {
        isValid = control.value.trim().length >= control.validation.minLength && isValid
    }
    if (control instanceof MyControlText && control.validation.email) {
        isValid = EmailValidator.validate(control.value) && isValid
    }
    
    return isValid
}
