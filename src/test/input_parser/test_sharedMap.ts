import assert from 'assert';
import { SharedMap } from '../../input_parser/implementations/sharedMap';

describe('Testing SharedMap', function() {
    it('should add the rules to the block', function() {
        let input = new SharedMap(new Map<string, Set<string>>())
        input.addRulesToBlock("b1",new Set<string>(["r1","r2","r3","r4"]))
        input.addRulesToBlock("b2",new Set<string>(["r1","r3","r4"]))
        let expected:Map<string, Set<string>> = new Map<string, Set<string>>()
        expected.set("b1",new Set<string>(["r1","r2","r3","r4"]))
        expected.set("b2",new Set<string>(["r1","r3","r4"]))

        assert.deepStrictEqual(input.rulesPerBlock,expected)
    });
    it('should append the rules to the block', function() {
        let map = new SharedMap(new Map<string, Set<string>>())
        map.addRulesToBlock("b1",new Set<string>(["r1","r2","r3","r4"]))
        map.addRulesToBlock("b1",new Set<string>(["r5","r5","r7"]))
        assert.deepStrictEqual(map.rulesPerBlock.get("b1"),new Set<string>(["r1","r2","r3","r4","r5","r7"]))
    });
    it('should raise an Error if You try to add an empty block to the SharedMap', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRulesToBlock("b1",new Set<string>()),
               Error
        )
    });
    it('should raise an Error if You try to add a block with an empty name to the SharedMap', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRulesToBlock("",new Set<string>(["r1"])),
               Error
        )
    });
    it('should raise an Error if You try to add a rule with an empty name to the SharedMap', function() {
        let sharedMap = new SharedMap(new Map<string, Set<string>>())
        assert.throws(
            () => sharedMap.addRulesToBlock("b1",new Set<string>(["","r1"])),
               Error
        )
    });
    it('should find the blocks of a specific rule', function() {
        let input = new SharedMap(new Map<string, Set<string>>())
        input.addRulesToBlock("b1",new Set<string>(["r1","r2","r3","r4"]))
        input.addRulesToBlock("b2",new Set<string>(["r1","r3","r4"]))
        let ruleToFind = "r3"
        let expected:string[] = ["b1","b2"]
        let actual:string[] = []
        for (const currentBlock of input.rulesPerBlock.keys()) {
            let currentSet:Set<string>|undefined = input.rulesPerBlock.get(currentBlock)
            if(currentSet !== undefined){
                if(currentSet.has(ruleToFind)){
                    actual.push(currentBlock)
                }
            }
        }
        assert.deepStrictEqual(actual,expected)
    });
    it('should find the rules of a specific block', function() {
        let input = new SharedMap(new Map<string, Set<string>>())
        input.addRulesToBlock("b1",new Set<string>(["r1","r2","r3","r4"]))
        input.addRulesToBlock("b2",new Set<string>(["r1","r3","r4"]))
        let blockToFind = "b2"
        let expected:Set<string> = new Set<string>(["r1","r3","r4"])
        let actual:Set<string>|undefined = input.rulesPerBlock.get(blockToFind)
        assert.deepStrictEqual(actual,expected)
    });
});