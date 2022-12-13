
export class preConditions{
    inputConditions !: [string];
    options!: string;
    requireMultiRun !: boolean;

    constructor(inputConditions : [string] = [""],
                options : string = "",
                requireMultiRun :boolean = false){
        this.inputConditions = inputConditions
        this.options = options
        this.requireMultiRun = requireMultiRun
    }

}