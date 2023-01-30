import assert from 'assert';
import { AspRule } from '../../src/input_parser/domain_primitives/asp_rule';
import { Label } from '../../src/input_parser/domain_primitives/label';
import { Rule } from '../../src/input_parser/models/rule';

describe('Testing rule parsing', function() {
    it('should parse', function() {
        let input = "%** @rule(labels=r2,ToTest) **%\n:- edge(X, Y), col(X,C), col(Y,C)."
        let expectedRule = new Rule(new Set<Label>([new Label("r2"),new Label("ToTest")]), new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
        let parsedRule:Rule = Rule.parse(input) as Rule
        assert.deepStrictEqual(parsedRule, expectedRule);
    });
    it('should raise an Error if You try to use an empty placeholder name', function() {
        assert.throws(
            () => new Rule(new Set<Label>([new Label("")]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X).")),
               Error
        )
    });
});