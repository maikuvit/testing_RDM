export class OutputMapper{
    static clingoToDlv(raw : string) : string {
        raw = raw.replace("UNSATISFIABLE", "INCOHERENT");
        raw = raw.replace("SATISFIABLE", "");
        raw = raw.replace("OPTIMUM FOUND", "OPTIMUM");
        raw = raw.replace("Optimization:", "COST");

        let costs = raw.match(/COST\s((?:\d+ *)*)/)
        if (costs) {
            let raw_costs = costs[1].trim();
            let clingo_costs = raw_costs.split(' ');
            let dlv_costs = clingo_costs.map((weight : string, index: number) => `${weight}@${clingo_costs.length-index}`)
            raw = raw.replace(/COST\s((?:\d+ *)*)/, `COST ${dlv_costs.join(' ')}`);
        }

        let lines = raw.split('\n').map(line => line.trim());
        lines = lines.map(line => {
            let match = line.match(/^(?:[a-z]\w*\(\w+(?:,\w+)*\) *)+$/)
            return match ? `{${line.replaceAll(' ', ', ')}}` : line 
        })

        return lines.join('\n');
    }
}