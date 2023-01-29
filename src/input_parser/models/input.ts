import { Annotation } from "../../common/interfaces/annotation";
import { Rule } from "./rule";
import { SharedMap } from "./shared_map";

export class Input extends Annotation {
  constructor(public annotations: SharedMap) {
    super();
  }

  public static override get regex(): RegExp {
    return /^%\*\*\s*@(rule)\(labels\s*=\s*(\s*\w+\s*(?:,\s*\w+\s*)*)\)\s*\*\*%\n(.+)|(?:@rule)/mg;
  }

  protected static tranform(matches: RegExpMatchArray): Input {
    let annotations: SharedMap = new SharedMap();
    for (let i = 0; i < matches.length; i++) {
      //if the element doesn't match the rule regex it means
      //that there is a @rule annotation that contains sintax errors
      if (!matches[i].match(Rule.regex)) {
        throw new Error(`sintax error: annotation ` + matches[i]);
      }
      let rule: Rule = Rule.parse(matches[i]) as Rule;
      annotations.addRuleToLabels(rule, rule.labels);
    }

    return new Input(annotations);
  }

  public override stringify(): string {
    return `"rules":"${this.annotations}"`;
  }
}
