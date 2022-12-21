import assert from 'assert';
import { Rule } from '../../src/input_parser/models/rule';

describe('Testing rule parsing', function() {
    it('should parse', function() {
        let input = "%** @rule(labels=r2,ToTest) **%\n:- edge(X, Y), col(X,C), col(Y,C)."
        let expectedRule = new Rule(new Set<string>(["r2","ToTest"]),":- edge(X, Y), col(X,C), col(Y,C).")
        let parsedRule:Rule = Rule.parse(input) as Rule
        assert.deepStrictEqual(parsedRule, expectedRule);
    });
});