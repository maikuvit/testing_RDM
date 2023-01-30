import assert from 'assert';
import { AspRule } from '../../src/input_parser/domain_primitives/asp_rule';
import { Label } from '../../src/input_parser/domain_primitives/label';
import { Rule } from '../../src/input_parser/models/rule';
import { SharedMap } from '../../src/input_parser/models/shared_map';

describe('Testing SharedMap', function() {
    it('should create placeholders for the rules', function() {
        let input = new SharedMap()
        let label1:Label = new Label("b1")
        let label2:Label = new Label("b2")
        let label3:Label = new Label("b3")
        let label4:Label = new Label("b4")
        let r1 = new Rule(new Set<Label>([label1,label2,label3,label4]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        input.addRuleToLabels(r1,new Set<Label>([label1,label2,label3,label4]))
        let r2 = new Rule(new Set<Label>([label1,label3,label4]),new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
        input.addRuleToLabels(r2,new Set<Label>([label1,label3,label4]))
        assert.deepStrictEqual(input.get(label1), new Set<Rule>([r1, r2]))
        assert.deepStrictEqual(input.get(label2), new Set<Rule>([r1]))
        assert.deepStrictEqual(input.get(label3), new Set<Rule>([r1, r2]))
        assert.deepStrictEqual(input.get(label4), new Set<Rule>([r1, r2]))
    });
    it('should append the rules to the placeholder', function() {
        let map = new SharedMap()
        let r1 = new Rule(new Set<Label>([new Label("b1")]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        map.addRuleToLabels(r1,new Set<Label>([new Label("b1")]))
        let r2 = new Rule(new Set<Label>([new Label("b1")]),new AspRule(":- edge(X, Y), col(X,C), col(Y,C)."))
        map.addRuleToLabels(r2,new Set<Label>([new Label("b1")]))
        assert.deepStrictEqual(map.get(new Label("b1")),new Set<Rule>([r1,r2]))
    });
    it('should raise an Error if You try to use an empty placeholder', function() {
        let sharedMap = new SharedMap()
        let r1 = new Rule(new Set<Label>(),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        assert.throws(
            () => sharedMap.addRuleToLabels(r1,new Set<Label>()),
               Error
        )
    });
    it('should find the rules of a specific placeholder', function() {
        let input = new SharedMap()
        let r1 = new Rule(new Set<Label>([new Label("b2")]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        let r3 = new Rule(new Set<Label>([new Label("b1")]),new AspRule("col(X,red) | col(X,blue) | col(X,green) :- node(X)."))
        input.addRuleToLabels(r3,new Set<Label>([new Label("b1")]))
        input.addRuleToLabels(r1,new Set<Label>([new Label("b2")]))
        assert.deepStrictEqual(input.get(new Label("b1")),new Set<Rule>([r3]))
    });
});