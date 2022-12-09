import assert from 'assert';
import { SharedMap } from '../../input_parser/implementations/sharedMap';

describe('Testing SharedMap', function() {
    it('should add the rule to the blocks', function() {
        let input = new SharedMap(new Map<string, Set<string>>())
        input.addRuleToBlocks("r1",new Set<string>(["b1","b2","b3","b4"]))
        input.addRuleToBlocks("r2",new Set<string>(["b1","b3","b4"]))
        let expected:Map<string, Set<string>> = new Map<string, Set<string>>()
        expected.set("b1",new Set<string>(["r1","r2"]))
        expected.set("b2",new Set<string>(["r1"]))
        expected.set("b3",new Set<string>(["r1","r2"]))
        expected.set("b4",new Set<string>(["r1","r2"]))

        assert.deepStrictEqual(input.rulesByBlock,expected)
    });
    it('should append the rules to the block', function() {
        let map = new SharedMap(new Map<string, Set<string>>())
        map.addRuleToBlocks("r1",new Set<string>(["b1"]))
        map.addRuleToBlocks("r2",new Set<string>(["b1"]))
        assert.deepStrictEqual(map.rulesByBlock.get("b1"),new Set<string>(["r1","r2"]))
    });
    it('should raise an Error if You try to add a rule to an empty block', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRuleToBlocks("r1",new Set<string>()),
               Error
        )
    });
    it('should raise an Error if You try to add a rule to a block with an empty name', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRuleToBlocks("r1",new Set<string>([""])),
               Error
        )
    });
    it('should raise an Error if You try to add a rule with an empty name to a block', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRuleToBlocks("",new Set<string>(["b1","b2"])),
               Error
        )
    });
    it('should find the rules of a specific block', function() {
        let input = new SharedMap(new Map<string, Set<string>>())
        input.addRuleToBlocks("r3",new Set<string>(["b1"]))
        input.addRuleToBlocks("r1",new Set<string>(["b2"]))
        assert.deepStrictEqual(input.get("b1"),new Set<string>(["r3"]))
    });
});