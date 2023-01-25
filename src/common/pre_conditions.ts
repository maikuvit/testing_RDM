
export class preConditions{
    inputConditions !: [string];
    options!: string;
    AllAnswerSets !: boolean;

    constructor(inputConditions : [string] = [""],
                options : string = "",
                AllAnswerSets :boolean = false){
        this.inputConditions = inputConditions
        this.options = options
        this.AllAnswerSets = AllAnswerSets
    }

}