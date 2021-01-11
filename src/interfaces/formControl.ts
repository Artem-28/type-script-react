
import { MyControlSelectDevision, MyControlText, MyControlDate } from "../entities/MyControls";
import { IDevision } from "./devision";
import { IValidation } from "./validationControl";


export type valueControlType = string | Date | null 
export type controlType = MyControlSelectDevision | MyControlText | MyControlDate

export interface IControl {
    id: number
    label?: string
    value?: valueControlType
    valid: boolean
    touched: boolean
    validation: IValidation  
    errorMessage?: string
}

export interface IControlDate extends IControl  {
    value: Date | null
}

export interface IControlText extends IControl  {
    value: string
}

export interface IControlSelectDevision  {
    id: number
    label?: string
    value: IDevision | null
    valid: boolean
    touched: boolean
    errorMessage?: string
}