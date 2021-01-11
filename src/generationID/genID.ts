export function genID(): number {
    return (Math.floor(Math.random()*1000000)+ Number(new Date()));
}