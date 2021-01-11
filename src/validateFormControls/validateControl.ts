import { MyControlSelectDevision } from "../entities/MyControls"
import { controlType } from "../interfaces/formControl"

export function validateControl(control: controlType): boolean {
    let isValid: boolean = true
    if (control instanceof MyControlSelectDevision) {
        isValid = control.value !== null && isValid
    } else if (control.validation.required && typeof(control.value) === 'string'){
        isValid = control.value.trim() !== '' && isValid
    } 
    
    return isValid
}