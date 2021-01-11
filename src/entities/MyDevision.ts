import { genID } from "../generationID/genID"
import { IDevision } from "../interfaces/devision"

export class MyDevision implements IDevision {
    id: number = genID()
    name: string
    date: Date
    constructor(name: string, date: Date,) {
        this.name = name
        this.date = date
    }
    set setId(id: number){ this.id = id }
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

