import assert from 'assert';
import { Rule } from '../../input_parser/implementations/rule';
import { SharedMap } from '../../input_parser/implementations/sharedMap';

describe('Testing rule parsing', function() {
    it('should parse', function() {
        let input = "%** @rule(name=\"r2\", block=\"ToTest\") **%\n:- edge(X, Y), col(X,C), col(Y,C)."
        let expected = new Rule("r2",":- edge(X, Y), col(X,C), col(Y,C).")
        Rule.sharedMap = new SharedMap(new Map<string,Set<string>>())
        let parsedRule:Rule = Rule.parse(input) as Rule
        assert.equal(parsedRule.annotationName, expected.annotationName);
        assert.equal(parsedRule.content, expected.content);
    });
    it('should stringify', function() {
        let input = new Rule("r2",":- edge(X, Y), col(X,C), col(Y,C).")
        let expected = "%** @rule(name=\"r2\") **%\n:- edge(X, Y), col(X,C), col(Y,C)."
        assert.equal(input.stringify(), expected);
    });
});