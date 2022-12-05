import assert from 'assert';
import { Atom } from '../../dlv_output_parser/models/atom';
import { SimpleTest } from '../../testing_module/implementations/simpleTest';
import {TestParser} from '../../testing_module/implementations/testParser'

describe('Testing TestParser', function() {
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
        let testsContainer:TestParser = TestParser.parse(input) as TestParser
        assert.equal(testsContainer.tests.length,1)
        let simpletest:SimpleTest = testsContainer.tests[0]
        let atoms:Atom[] = simpletest.input
        let expectedAtoms:Atom[] = [new Atom("node",["1"]),new Atom("node",["2"]),new Atom("node",["3"]),new Atom("edge",["1","2"]),new Atom("edge",["1","3"]),new Atom("edge",["2","3"])]
        for(let i=0;i<atoms.length;i++){
            let atom1 = atoms[i]
            let atom2 = expectedAtoms[i]
            assert.equal(atom1.name,atom2.name)
            assert.deepStrictEqual(atom1.literals,atom2.literals)
        }
        assert.equal(simpletest.scope.length,1)
        assert.equal(simpletest.scope[0],"ToTest")
        assert.equal(simpletest.assert[0].constructor.name, "TrueInExactly");
        assert.equal(simpletest.assert[1].constructor.name, "TrueInExactly");
        assert.equal(simpletest.assert[2].constructor.name, "NoAnswerSet");
    });
});