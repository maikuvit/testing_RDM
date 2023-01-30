import assert from 'assert';
import { AspRule } from '../../src/input_parser/domain_primitives/asp_rule';
import { Label } from '../../src/input_parser/domain_primitives/label';
import { Input } from '../../src/input_parser/models/input';
import { Rule } from '../../src/input_parser/models/rule';

describe('Testing input parsing', function () {
    it('should parse', function () {
        let input =
`%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).
        
%** @rule(labels=r1,ToTest) **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).
        
%** @rule(labels=r2,ToTest) **%
:- edge(X, Y), col(X,C), col(Y,C).`
        let parsedInput: Input = Input.parse(input) as Input
        let r1 = new Rule(new Set<Label>([new Label("r1"), new Label("ToTest")]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        let r2 = new Rule(new Set<Label>([new Label("r2"), new Label("ToTest")]),new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
        assert.deepStrictEqual(parsedInput.annotations.get(new Label("ToTest")), new Set<Rule>([r1, r2]))
        assert.deepStrictEqual(parsedInput.annotations.get(new Label("r1")), new Set<Rule>([r1]))
        assert.deepStrictEqual(parsedInput.annotations.get(new Label("r2")), new Set<Rule>([r2]))
    });
});