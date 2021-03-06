import { genID } from "../generationID/genID"
import { IDevision } from "../interfaces/devision"
import {IControl, IControlDate, IControlSelectDevision, IControlText, valueControlType} from "../interfaces/formControl"
import { IValidation } from "../interfaces/validationControl"

class MyControl implements IControl {
    readonly id: number = genID()
    value: valueControlType = ''
    valid: boolean = false
    touched: boolean = false
    validation: IValidation
    label?: string 
    constructor (validation: IValidation, value:valueControlType,  label?: string ){
        this.value = value
        this.label = label
        this.validation = validation
    }
}

export class MyControlText extends MyControl implements IControlText {
    value: string 
    errorMessage: string = 'Поле не должно быть пустым'
    constructor(validation: IValidation,  value: string, label?: string){
        super(validation, value);
        this.validation = validation
        this.value = value 
        this.label = label
    }
    clear(): void { 
        this.value = '' 
        this.valid = false
        this.touched = false
    }
}

export class MyControlDate extends MyControl implements IControlDate {
    value: Date | null 
    valid: boolean = true
    constructor(validation: IValidation,  value: Date | null, label?: string){
        super(validation, value);
        this.validation = validation
        this.value = value 
        this.label = label
    }
    currentDate(): void {
        this.value = new Date()
        this.touched = false
    }
}

export class MyControlSelectDevision implements IControlSelectDevision {
    readonly id: number = genID()
    value: IDevision | null
    valid: boolean = false
    touched: boolean = false
    errorMessage: string = 'Поле не должно быть пустым'
    label?: string
    constructor (value:IDevision | null,  label?: string ){
        this.value = value
        this.label = label
    }
    clear(): void { 
        this.value = null 
        this.valid = false
        this.touched = false
    }
}