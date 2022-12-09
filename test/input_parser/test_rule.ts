import assert from 'assert';
import { Rule } from '../../input_parser/implementations/rule';

describe('Testing rule parsing', function() {
    it('should parse', function() {
        let input = "%** @rule(name=r2, blocks=ToTest) **%\n:- edge(X, Y), col(X,C), col(Y,C)."
        let expectedRule = new Rule("r2",new Set<string>(["r2","ToTest"]),":- edge(X, Y), col(X,C), col(Y,C).")
        let parsedRule:Rule = Rule.parse(input) as Rule
        assert.deepStrictEqual(parsedRule, expectedRule);
    });
});