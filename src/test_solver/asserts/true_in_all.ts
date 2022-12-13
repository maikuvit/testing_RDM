import { Assert } from "../../common/interfaces/assert";
import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { preConditions } from "../../common/pre_conditions";
import { arrayContainsAll } from "../../common/utils";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";


export class TrueInAll extends Assert {

    public constructor(
        public atoms: Atom[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }

    public fullfilRequirements(model: DlvOutputModel): [DlvOutputModel] {
        // qui devo generare un set di rules per ogni atomo
        return [model];
    }

    public assert(output: Output): boolean {
        return output.answers.length === 0;
    }
}