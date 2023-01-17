export class ClingoOutputMapper{
    static toDlv(raw : string) : string {
        return raw;
        return "\
        DLV 2.1.2\
        {col(1,green), col(2,blue), col(3,red), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        {col(1,green), col(2,red), col(3,blue), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        {col(1,blue), col(2,green), col(3,red), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        {col(1,red), col(2,green), col(3,blue), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        {col(1,red), col(2,blue), col(3,green), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        {col(1,blue), col(2,red), col(3,green), edge(1,2), edge(1,3), edge(2,3), node(1), node(2), node(3)}\
        "
    }
}