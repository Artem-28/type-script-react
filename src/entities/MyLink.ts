import { Ilink } from "../interfaces/link"

export class MyLink implements Ilink {
    path: string
    label: string
    icon?: JSX.Element
    constructor(path: string, label: string, icon?: JSX.Element) {
        this.path = path
        this.label = label
        this.icon = icon
    }
}