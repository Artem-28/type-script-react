import { MyControlText } from "../entities/MyControls"
import * as EmailValidator from 'email-validator';
import { controlType } from "../interfaces/formControl"


export function validateControl(control: controlType, comparableControl?: controlType): controlType {
    let isValid: boolean = true
    if (control.validation.required && typeof(control.value) === 'string'){
        isValid = control.value.trim() !== '' && isValid
        control.errorMessage = 'Данное поле не должно быть пустым'
    } 
    if (control instanceof MyControlText && control.validation.minLength) {
        isValid = control.value.trim().length >= control.validation.minLength && isValid
        control.errorMessage =`Пароль должен содержать ${control.validation.minLength} символов`
    }
    if (control instanceof MyControlText && control.validation.email) {
        isValid = EmailValidator.validate(control.value) && isValid
        control.errorMessage ='Введен некорректный email'
    }
    if (control instanceof MyControlText && control.validation.repeat && !!comparableControl) {
        isValid = control.value === comparableControl.value && isValid
        control.errorMessage ='Пароли не совпадают'
    }
    control.valid = isValid
    return control
}
