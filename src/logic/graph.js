class Graph {
    adjTable = [];
    size = 0;

    constructor(json) {
        this.size = json.size;
        this.adjTable = [];

        for (let i = 0; i < this.size; i++) {
            this.adjTable.push([]);

            for (let j = 0; j < this.size; j++) {
                this.adjTable[i].push(0);
            }
        }

        json.data.split(';').forEach(edge => {
            const [from, to] = edge.split(',');
            this.adjTable[from][to] = 1;
            this.adjTable[to][from] = 1;
        });
    }

    isAdjacent(from, to) {
        return this.adjTable[from][to] === 1;
    }
}

export default Graph;