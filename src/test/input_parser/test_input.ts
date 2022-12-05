import assert from 'assert';
import { Block } from '../../input_parser/implementations/block';
import { Input } from '../../input_parser/implementations/input';
import { Rule } from '../../input_parser/implementations/rule';

describe('Testing input parsing', function() {
    it('should parse', function() {
        let input = 
`%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).
        
%** @block(name="ToTest") **%
%** @rule(name="r1", block="ToTest") **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).
        
%** @rule(name="r2", block="ToTest") **%
:- edge(X, Y), col(X,C), col(Y,C).
        
%**@test("name" : "checkRules",
"scope" : [ "ToTest" ],
"input" : "node(1). node(2). node(3). edge(1,2). edge(1,3). edge(2,3).",
"assert" : [
"@trueInExactly{ 'number' : 2, 'atoms' : ['col(1, red).'] }",
"@trueInExactly{ 'number' : 1, 'atoms' : ['col(1, red).', 'col(2, blue).'] }",
"@noAnswerSet{}"  
]
)
**%`
        let rules = new Map<string,Rule>()
        rules.set("r1",new Rule("r1","col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        rules.set("r2",new Rule("r2",":- edge(X, Y), col(X,C), col(Y,C)."))
        let blocks = new Map<string,Block>()
        blocks.set("ToTest",new Block("ToTest"))
        let expected = new Input(rules,blocks)
        let parsedInput:Input = Input.parse(input) as Input
        assert.deepStrictEqual(parsedInput.rules, expected.rules);
        assert.deepStrictEqual(parsedInput.blocks, expected.blocks);
    });
    it('should stringify', function() {
        let rules = new Map<string,Rule>()
        rules.set("r1",new Rule("r1","col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        rules.set("r2",new Rule("r2",":- edge(X, Y), col(X,C), col(Y,C)."))
        let blocks = new Map<string,Block>()
        blocks.set("ToTest",new Block("ToTest"))
        let input = new Input(rules,blocks)
        let expected = `"rules":"${rules}","blocks":"${blocks}"`
        assert.equal(input.stringify(), expected);
    });
});