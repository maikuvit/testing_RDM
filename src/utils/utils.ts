import { existsSync } from "fs";
import { Atom } from "../dlv_output_parser/models/atom";

export function areObjectEqual<T>(obj1: T, obj2: T): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

//consider two array equals if they have the same elements but not necessarily in the same order
export function areArrayEqualNoOrder<T>(arr1: T[], arr2: T[]): boolean {

    if (arr1.length !== arr2.length)
        return false;

    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.find((obj2) => areObjectEqual(arr1[i], obj2)))
            return false
    }

    return true;
}

export function fillMissingValues<T>(source : T[], target : T[]) : T[] {
    let retVal : any[] = [...source]
    for (let i = 0; i < target.length; i++) {
        const objTarget = target[i];
        if(!retVal.find((objSource) => areObjectEqual(objSource, objTarget)))
            retVal.push(objTarget)
    }
    return retVal
}

export function arrayContainsAll<T>(array : T[], values : T[]) : boolean {
    return values.every(val => array.find(obj => areObjectEqual(obj, val)))
}

export function convertedAtoms(atoms:string[]) : Atom[]{
    let convertedAtoms:Atom[] = []
    for(let i = 0; i< atoms.length; i++){
        let matches = atoms[i].match(/(\w+)\s*\(([a-zA-Z0-9]+(?:\s*,\s*[a-zA-Z0-9]+)*)\)/m)
        if(matches!== null){
            //console.log(matches[2].split(","))
            let name = matches[1].trim()
            let literals = matches[2].trim()
            convertedAtoms.push(new Atom(name,literals.split(",")))
        }
        else{
            throw new Error(`can't convert atoms`)
        }
    }
    return convertedAtoms
    
}

export function checkFileExist(filepath :string) : boolean{
    return existsSync(filepath);
}