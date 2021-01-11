import { validationFormsType } from "../interfaces/validationFormsType"

export function formValidateControl(controls: validationFormsType): boolean {
    let isValid = true
    Object.values(controls).map(control => isValid = control.valid && isValid )
    return isValid
}