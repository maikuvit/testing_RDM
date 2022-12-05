import { AnswerSet } from "../../dlv_output_parser/models/answer_set";
import { Output } from "../../dlv_output_parser/models/output";
import { Atom } from "../../dlv_output_parser/models/atom";
import { AssertTrueIn } from "../interfaces/dlvAssert";
import { arrayContainsAll } from "../../utils/utils";


export class AssertNoAnswerSet extends AssertTrueIn {
    public constructor(
        public atoms : Atom[] = []
        ){
        super(atoms)
    }

    public validate(output: Output): boolean {
        return output.answers.length === 0;
    }
}

export class AssertTrueInAll extends AssertTrueIn {

    public constructor(
        public atoms : Atom[]
        ){
        super(atoms)
    }

    public validate(output: Output): boolean {
        return output.answers.every(ans => arrayContainsAll(ans.atoms, this.atoms))
    }
}


export class AssertTrueInAtLeast extends AssertTrueIn{

    public constructor(
        public number: number,
        public atoms: Atom[],
        ){
        super(atoms)
    }

    public validate(output: Output): boolean {
        let true_in_cont = 0;
        if(this.number > output.answers.length)
            throw new Error(`${this.number} could not be greater than answersets number'${output.answers.length}'`)
        output.answers.forEach(ans => {
            if(this.true_in_one(ans)) true_in_cont++;
        });
        return true_in_cont >= this.number
    }
}


export class AssertTrueInAtMost extends AssertTrueIn{

    public constructor(
        public number: number,
        public atoms: Atom[],
        ){
        super(atoms)
    }

    public validate(output: Output): boolean {
        let true_in_cont = 0;
        if(this.number > output.answers.length)
            throw new Error(`${this.number} could not be greater than answersets number'${output.answers.length}'`)
        output.answers.forEach(ans => {
            if(this.true_in_one(ans)) true_in_cont++;
        });
        return true_in_cont <= this.number
    }

    
}


export class AssertTrueInExactly extends AssertTrueIn{

    public constructor(
        public number: number,
        public atoms : Atom[],
    ){
        super(atoms);
    }
    
    public validate(output: Output): boolean {
        let true_in_cont = 0;
        if(this.number > output.answers.length)
            throw new Error(`${this.number} could not be greater than answersets number'${output.answers.length}'`)
        output.answers.forEach(ans => {
            if(this.true_in_one(ans)) true_in_cont++;
        });
        return true_in_cont == this.number
    }
}

