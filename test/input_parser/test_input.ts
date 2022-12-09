import assert from 'assert';
import { Input } from '../../src/input_parser/models/input';

describe('Testing input parsing', function () {
    it('should parse', function () {
        let input =
`%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).
        
%** @rule(name=r1, blocks=ToTest) **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).
        
%** @rule(name=r2, blocks=ToTest) **%
:- edge(X, Y), col(X,C), col(Y,C).`
        let parsedInput: Input = Input.parse(input) as Input
        let r1 = "col(X,red) | col(X,blue) | col(X,green) :- node(X)."
        let r2 = ":- edge(X, Y), col(X,C), col(Y,C)."
        assert.deepStrictEqual(parsedInput.annotations.get("ToTest"), new Set<string>([r1, r2]))
        assert.deepStrictEqual(parsedInput.annotations.get("r1"), new Set<string>([r1]))
        assert.deepStrictEqual(parsedInput.annotations.get("r2"), new Set<string>([r2]))
    });
});