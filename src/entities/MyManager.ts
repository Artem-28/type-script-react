import { genID } from "../generationID/genID";
import { IManager, ISendManager } from "../interfaces/manager";

import { v4 as uuidv4 } from 'uuid';
import { IDevision } from "../interfaces/devision";

export class SendManager implements ISendManager {
    id: number = genID()
    uuid: string = uuidv4()
    lastName: string
    name: string
    devisionKey: string
    date: Date
    constructor(lastName: string, name: string, devisionKey: string,  date: Date){
        this.lastName = lastName
        this.name = name
        this.devisionKey = devisionKey
        this.date = date
    }
}

export class MyManager implements IManager {
    id: number = genID()
    uuid: string = uuidv4()
    lastName: string
    name: string
    devision: IDevision
    date: Date
    constructor(lastName: string, name: string, devision: IDevision,  date: Date){
        this.lastName = lastName
        this.name = name
        this.devision = devision
        this.date = date
    }
    set setId(id: number){ this.id = id }
    set setUuid(uuid: string) { this.uuid = uuid }
    get formatDate(): string {
        const month: string[] = [
            'Января', 'Февраля', 'Марта',
            'Апреля', 'Мая', 'Июня', 
            'Июля', 'Августа', 'Сентября', 
            'Октября', 'Ноября', 'Декабря',]
        let DD: string | number = this.date.getDate()
        const MM: string = month[this.date.getMonth()] 
        const YYYY: number = this.date.getFullYear();
        let HH: string | number = this.date.getHours()
        let mm: string | number = this.date.getMinutes()
        let ss: string | number = this.date.getSeconds()

        if (DD < 10)  DD = '0' + DD;
        if (HH < 10)  HH = '0' + HH;
        if (mm < 10)  mm = '0' + mm;
        if (ss < 10)  ss = '0' + ss;
        
        return `${DD} ${MM} ${YYYY}  ${HH}:${mm}:${ss}` 
    }
}