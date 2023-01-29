// import assert from 'assert';
// import { AspRule } from '../../src/input_parser/models/asp_rule';
// import { Rule } from '../../src/input_parser/models/rule';
// import { SharedMap } from '../../src/input_parser/models/shared_map';

// describe('Testing SharedMap', function() {
//     it('should create placeholders for the rules', function() {
//         let input = new SharedMap(new Map<string, Set<Rule>>())
//         let r1 = new Rule(new Set<string>(["b1","b2","b3","b4"]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         input.add(r1,new Set<string>(["b1","b2","b3","b4"]))
//         let r2 = new Rule(new Set<string>(["b1","b3","b4"]),new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
//         input.add(r2,new Set<string>(["b1","b3","b4"]))
//         let expected:Map<string, Set<Rule>> = new Map<string, Set<Rule>>()
//         expected.set("b1",new Set<Rule>([r1,r2]))
//         expected.set("b2",new Set<Rule>([r1]))
//         expected.set("b3",new Set<Rule>([r1,r2]))
//         expected.set("b4",new Set<Rule>([r1,r2]))

//         assert.deepStrictEqual(input.rulesByLabel,expected)
//     });
//     it('should append the rules to the placeholder', function() {
//         let map = new SharedMap(new Map<string, Set<Rule>>())
//         let r1 = new Rule(new Set<string>(["b1"]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         map.add(r1,new Set<string>(["b1"]))
//         let r2 = new Rule(new Set<string>(["b1"]),new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
//         map.add(r2,new Set<string>(["b1"]))
//         assert.deepStrictEqual(map.rulesByLabel.get("b1"),new Set<Rule>([r1,r2]))
//     });
//     it('should raise an Error if You try to use an empty placeholder', function() {
//         let sharedMap = new SharedMap(new Map<string, Set<Rule>>())
//         let r1 = new Rule(new Set<string>(),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         assert.throws(
//             () => sharedMap.add(r1,new Set<string>()),
//                Error
//         )
//     });
//     it('should raise an Error if You try to use an empty placeholder name', function() {
//         let sharedMap = new SharedMap(new Map<string, Set<Rule>>())
//         let r1 = new Rule(new Set<string>([""]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         assert.throws(
//             () => sharedMap.add(r1,new Set<string>([""])),
//                Error
//         )
//     });
//     it('should find the rules of a specific placeholder', function() {
//         let input = new SharedMap(new Map<string, Set<Rule>>())
//         let r1 = new Rule(new Set<string>(["b2"]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         let r3 = new Rule(new Set<string>(["b1"]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
//         input.add(r3,new Set<string>(["b1"]))
//         input.add(r1,new Set<string>(["b2"]))
//         assert.deepStrictEqual(input.get("b1"),new Set<Rule>([r3]))
//     });
// });