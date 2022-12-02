import assert from "assert";
import { AnswerSet } from "../../dlv_output_parser/models/answer_set";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Cost } from "../../dlv_output_parser/models/cost";
import { Output } from "../../dlv_output_parser/models/output";
import { AssertNoAnswerSet, AssertTrueInAll, AssertTrueInAtLeast, AssertTrueInAtMost, AssertTrueInExactly } from "../../asserts/models/AssertsTrue";

describe('AssertTrueInAtLeast Tests', () => {
    it('checking if validate method return correct response true in at least 3 answersets', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtLeast(3, list_atoms_to_be_true).validate(input), true);
    });
    it('checking if validate method return correct response true in at least 4 answersets but 3 contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])]
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])]
        let atoms_2: Atom[] = [new Atom('atomo',['1'])]
        let atoms_3: Atom[] = []
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        let answerset_3: AnswerSet = new AnswerSet(atoms_3, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_3);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtLeast(4, list_atoms_to_be_true).validate(input), false);
    });

    it('checking if validate method return correct response true in at least 3 answersets with list_atoms_to_be_true contains 2 atoms', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])]
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])]
        let atoms_2: Atom[] = [new Atom('atomo',['1'])]
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1']), new Atom('atomo', ['2'])];
        assert.equal(new AssertTrueInAtLeast(3, list_atoms_to_be_true).validate(input), false);
    });

    it('checking if validate method return correct response true in at least 3 answersets but 2 contains requested atoms', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])]
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])]
        let atoms_2: Atom[] = [new Atom('atomo',['1'])]
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1']), new Atom('atomo', ['2'])];
        assert.equal(new AssertTrueInAtLeast(2, list_atoms_to_be_true).validate(input), true);
    });

    it('checking if validate method return correct response true in at least 0 answersets and no of them contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])]
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])]
        let atoms_2: Atom[] = [new Atom('atomo',['1'])]
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['4'])];
        assert.equal(new AssertTrueInAtLeast(0, list_atoms_to_be_true).validate(input), true);
       
    });
    it('checking if validate method throw Error when called with n greater than answersets length', () =>{
        let answersets: AnswerSet[] = [];
        let input: Output = new Output(answersets);
        let list_atoms_to_be_true = [new Atom('atomo', ['4'])];
        assert.throws(() => {
            new AssertTrueInAtLeast(5, list_atoms_to_be_true).validate(input)
        }, Error, "Error thrown");
    });
  
   
});


describe('AssertTrueInAtMost Tests', () =>{
    it('checking if validate method return correct response true in at most 3 answersets but 4 contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let atoms_3: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        let answerset_3: AnswerSet = new AnswerSet(atoms_3, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_3);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtMost(3, list_atoms_to_be_true).validate(input), false);
    });
    it('checking if validate method return correct response true in at most 3 answersets and 2 contains requested atoms', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true); 
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1']),new Atom('atomo', ['2'])];
        assert.equal(new AssertTrueInAtMost(3, list_atoms_to_be_true).validate(input), true);
    });
    it('checking if validate method return correct response true in at most 3 answersets and 4 contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtMost(3, list_atoms_to_be_true).validate(input), false);
    });
    it('checking if validate method return correct response true in at most 0 answersets and 4 contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtMost(0, list_atoms_to_be_true).validate(input), false);
    });
    it('checking if validate method return correct response true in at most  answersets and 4 contains requested atom', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAtMost(0, list_atoms_to_be_true).validate(input), false);
    });
    it('checking if validate method throw Error when called with n greater than answersets length', () =>{
        let answersets: AnswerSet[] = [];
        let input: Output = new Output(answersets);
        let list_atoms_to_be_true = [new Atom('atomo', ['4'])];
        assert.throws(() => {
            new AssertTrueInAtLeast(5, list_atoms_to_be_true).validate(input)
        }, Error, "Error thrown");
    });
});


describe('AssertTrueInExactly Tests', () =>{
    it('checking if validate method throw Error when called with n greater than answersets length', () =>{
        let answersets: AnswerSet[] = [];
        let input: Output = new Output(answersets);
        let list_atoms_to_be_true = [new Atom('atomo', ['4'])];
        assert.throws(() => {
            new AssertTrueInAtLeast(5, list_atoms_to_be_true).validate(input)
        }, Error, "Error thrown");
    });

    it('checking if validate method return correct response true in exactly 3 answersets', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInExactly(3, list_atoms_to_be_true).validate(input), true);
    });

    it('checking if validate method return correct response true in exactly 3 answersets but 4 provided', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInExactly(3, list_atoms_to_be_true).validate(input), false);
    });
    it('checking if validate method return correct response true in exactly 3 answersets but 2 provided', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['2'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInExactly(3, list_atoms_to_be_true).validate(input), false);
    });

});


describe('AssertNoAnswerSet Test', () =>{
    it('checking if validate method return correct response true when no answersets in output object',() =>{
        let answersets: AnswerSet[] = [];
        let input: Output = new Output(answersets);
        assert.equal(new AssertNoAnswerSet().validate(input), true);
    });
    it('checking if validate method return correct response false when there are answersets in output object',() =>{
        let answersets: AnswerSet[] = [];
        let answerset_0: AnswerSet = new AnswerSet([], [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet([], [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        let input: Output = new Output(answersets);
        assert.equal(new AssertNoAnswerSet().validate(input), false);
    });
});


describe('AssertTrueInAll Test', () =>{
    it('checking if validate method return correct response true when all answersets contains the specified atoms', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['1'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAll(list_atoms_to_be_true).validate(input),true);
    });
    it('checking if validate method return correct response false when not all answersets contains the specified atoms', () =>{
        let answersets: AnswerSet[] = [];
        let atoms_0: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2']),new Atom('atomo',['3'])];
        let atoms_1: Atom[] = [new Atom('atomo',['1']),new Atom('atomo',['2'])];
        let atoms_2: Atom[] = [new Atom('atomo',['2'])];
        let answerset_0: AnswerSet = new AnswerSet(atoms_0, [new Cost(1,1)], true);
        let answerset_1: AnswerSet = new AnswerSet(atoms_1, [new Cost(1,1)], true);
        let answerset_2: AnswerSet = new AnswerSet(atoms_2, [new Cost(1,1)], true);
        answersets.push(answerset_0);
        answersets.push(answerset_1);
        answersets.push(answerset_2);
        let input: Output = new Output(answersets);

        let list_atoms_to_be_true = [new Atom('atomo', ['1'])];
        assert.equal(new AssertTrueInAll(list_atoms_to_be_true).validate(input),false);
    });
});