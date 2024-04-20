//create a ts model of graph
export interface GraphModel {
    calculationType: string;
    source: string;
    target: string;
    nodes: string[];
    edges: Edge[];
}

interface Edge{
    source: string;
    target: string;
    value: string;
}

