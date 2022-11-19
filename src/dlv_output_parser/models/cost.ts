import { DlvModel } from "../interfaces/dlv_model";

export class Cost extends DlvModel {
    constructor(
        public weight : number,
        public level : number){
        super()
    }

    public static get regex(): RegExp {
        return /(\d+)@(\d+)/
    }

    protected static tranform(match: RegExpMatchArray): Cost {
        let weight : number = Number.parseInt(match[1])
        let level : number = Number.parseInt(match[2])
        return new Cost(weight, level)
    }

    public static to_string(model: Cost): string {
        return `${model.weight}@${model.level}`
    }
}