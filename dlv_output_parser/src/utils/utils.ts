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
